$(function() {
    var bs = new BScroll('.wrap', {
        click: true,
        probeType: 2
    });
    $.ajax({
        url: "./data/data.json",
        dataType: 'json',
        success: function(res) {
            if (res.code == 1) {
                rande(res.data);
            }
        }
    });

    function rande(data) {
        var list = {};
        var listArr = [];
        var arr = [];
        var listStr = '';
        var navStr = '';
        for (var i in data) {
            var first = data[i].Spelling.substr(0, 1);
            if (arr.indexOf(first) == -1) {
                arr.push(first);
            }
            if (!list[first]) {
                list[first] = {
                    title: first,
                    lists: []
                }
            }
            list[first].lists.push(data[i]);
        }
        for (var i in list) {
            listArr.push(list[i])
        }
        arr.forEach(function(v, i) {
            navStr += `<li>${v}</li>`;
        })
        listArr.forEach(function(v, i) {
            listStr += ` <li> <h2>${v.title}</h2> <ol>`;
            v.lists.forEach(function(a, b) {
                listStr += `<li>${a.Name}</li>`;
            })
            listStr += `</ol></li>`;
        });
        $('.list').append(listStr);
        $('.nav').append(navStr);
    };
    $('.nav').on("click", 'li', function() {
        var index = $(this).index();
        var html = $(this).html();
        bs.scrollToElement($('.list>li').eq(index)[0]);
        $('.inn').removeClass('action');
        $('.inn').html(html);
        setTimeout(function() {
            $('.inn').addClass('action');
        }, 1000)
    });
});