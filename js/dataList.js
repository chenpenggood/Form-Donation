//面向过程,最初版本，渣优化，待封装优化,
//面向对象太绕了，思路跟不上，好难啊！
window.onload = function () {
    //----------------一、初始化数据，借鉴模拟数据----------
    var id = 0;
    //1、捐款数组
    var MoneyList = [
        addMoneyList("夫彭魄", 1, 10000000, "2013-12-15"),
        addMoneyList("那拉珺琪", 2, 10000000, "2013-12-16"),
        addMoneyList("种若兰", 3, 10000000, "2013-12-17"),
        addMoneyList("桐海秋", 4, 10000000, "2013-12-12"),
        addMoneyList("葛绿竹", 1, 10000000, "2013-12-11"),
        addMoneyList("仙半烟", 1, 10000000, "2013-12-15"),
        addMoneyList("革绿海", 2, 10000000, "2013-12-16"),
        addMoneyList("但雅懿", 3, 10000000, "2013-12-17"),
        addMoneyList("巢涵瑶", 4, 10000000, "2013-12-12"),
        addMoneyList("褒琇芳", 1, 10000000, "2013-12-11"),
        addMoneyList("委清秋", 1, 10000000, "2013-12-15"),
        addMoneyList("府雁菱", 2, 10000000, "2013-12-16"),
        addMoneyList("邝燕桦", 3, 10000000, "2013-12-17"),
        addMoneyList("镇建柏", 4, 10000000, "2013-12-12"),
        addMoneyList("阮寻芹", 1, 10000000, "2013-12-11"),
        addMoneyList("滕翔宇", 1, 10000000, "2013-12-15"),
        addMoneyList("蔡彭泽", 2, 10000000, "2013-12-16"),
        addMoneyList("中意致", 3, 10000000, "2013-12-17"),
        addMoneyList("枚如云", 4, 10000000, "2013-12-12"),
        addMoneyList("丑尔白", 1, 10000000, "2013-12-11"),
        addMoneyList("咸天恩", 1, 10000000, "2013-12-15"),
        addMoneyList("宝德业", 2, 10000000, "2013-12-16"),
        addMoneyList("姬梦秋", 3, 10000000, "2013-12-17"),
        addMoneyList("貊念雁", 4, 10000000, "2013-12-12"),
        addMoneyList("弘晓蕾", 1, 10000000, "2013-12-11"),
        addMoneyList("黎英杰", 1, 10000000, "2013-12-15"),
        addMoneyList("鄞驰婷", 2, 10000000, "2013-12-16"),
        addMoneyList("毓语柳", 3, 10000000, "2013-12-17"),
        addMoneyList("綦情韵", 4, 10000000, "2013-12-12"),
        addMoneyList("尉迟友梅", 1, 10000000, "2013-12-11"),
        addMoneyList("李之桃", 4, 10000000, "2013-12-12"),
        addMoneyList("祝浩淼", 1, 10000000, "2013-12-11"),
    ];
    //2、捐款单位数组
    var OrgList = [{
        orgid: 1,
        name: "壹基金"
    }, {
        orgid: 2,
        name: "xx十字会"
    }, {
        orgid: 3,
        name: "宋庆龄基金"
    }, {
        orgid: 4,
        name: "全xx基金"
    }];
    //3、根据传入的参数返回一个对象，添加ID
    function addMoneyList(Pname, orgid, money, date) {
        id++;
        return {
            "id": id,
            "Pname": Pname,
            "orgid": orgid,
            "money": money,
            "date": date
        };
    }
    //----------------初始化数据，借鉴模拟数据----------
    //4、控制添加数据的日历的控件
    laydate({
        elem: '#J-xl'
    });


    //-------------------------------二、表格----------------------
    //1、获取元素对象
    //获取tbody对象
    var tbody = document.querySelector('#t_body');
    //当前页码对象
    var pageCurrent = document.querySelector('#pageindex');
    //页码总数对象
    var pageNum = document.querySelector('#count');
    //搜索捐款单位对象
    var unit = document.querySelector('#s_select');
    //捐款单位选项对象
    var unitOptions = unit.children;
    //添加捐款单位对象
    var getUnit = document.querySelector('#addselect');

    //2、翻页点击事件
    //下一页按钮对象
    var nextPage = document.getElementById('nextpage');
    // 上一页按钮对象
    var prePage = document.getElementById('prepage');
    //查询按钮对象
    var query = document.getElementById('querybtn');

    //3、添加数据对象
    //添加数据的姓名输入框对象
    var person = document.querySelector('.person');
    //添加数据的金额输入框对象
    var money = document.querySelector('.money');
    //添加数据的日期输入框对象
    var date = document.querySelector('.date');
    //添加数据的按钮对象
    var add = document.querySelector('#addBtn');

    //4、页码数
    //设置翻页时当前页码计算存储变量
    var pageIndex = 0;
    //设置每一页的数据容量
    var pageSize = 10;
    //计算中页数
    var pageTotol = Math.floor(MoneyList.length / 10);
    //计算总页码
    pageNum.innerHTML = pageTotol + 1;

    //5、首页加载
    getData(MoneyList, 0);
    //6、设置查询选项
    getSel(unit, 'get');
    //7、添加捐款选项
    getSel(getUnit, 'set');

    //-------------------------三、上下翻页---------------------------
    // 1、翻页下一页
    nextPage.onclick = function () {
        //超出范围改变按钮的样式
        prePage.className = '';
        if (pageIndex >= pageTotol - 1) {
            nextPage.className = 'disable';
        }
        //当前页码
        pageCurrent.innerHTML = pageIndex + 2;

        //判断是否超出总页数
        if (pageIndex >= pageTotol) {
            pageCurrent.innerHTML = pageTotol + 1;
            alert('嘿，已经是最后一页了！');
            return false;
        };
        pageIndex++;

        //调用函数
        getData(MoneyList, pageIndex);
    }

    //2、翻页上一页
    prePage.onclick = function () {
        //超出范围改变按钮的样式
        nextPage.className = '';
        if (pageIndex < 2) {
            prePage.className = 'disable';
        }
        //当前页码
        pageCurrent.innerHTML = pageIndex;
        //判断是否超出总页数
        if (pageIndex < 1) {
            pageCurrent.innerHTML = 1;
            alert('嘿，已经是首页了！');
            return false;
        };
        pageIndex--;
        //调用函数
        getData(MoneyList, pageIndex);
    }

//---------------------四、增、删、改、查功能------------------------
//1、查找 
function getSelData(data, text) {
    var html = '',
        txt = text;
    data.map(function (value, index) {
        // console.log(value.orgid);
        //遍历捐款单位
        OrgList.map(function (Ovalue) {
            if (Ovalue.orgid === value.orgid) {
                value.orgid = Ovalue.name;
            }
            return Ovalue.name;
        })
        if (value.orgid === txt) {
            //将数据添加到页面中
            html += '<tr>' +
                '<td>' + value.id + '</td>' +
                '<td>' + value.Pname + '</td>' +
                '<td>' + value.orgid + '</td>' +
                '<td>' + value.money + '</td>' +
                '<td>' + value.date + '</td>' +
                '<td>' +
                '<span class="redact">✎</span>' +
                '<span class="del">✖</span>' +
                '</td>' +
                '</tr>'
            tbody.innerHTML = html;
        }
        if (txt === '--请选择--') {
            //将数据添加到页面中
            html += '<tr>' +
                '<td>' + value.id + '</td>' +
                '<td>' + value.Pname + '</td>' +
                '<td>' + value.orgid + '</td>' +
                '<td>' + value.money + '</td>' +
                '<td>' + value.date + '</td>' +
                '<td>' +
                '<span class="redact">✎</span>' +
                '<span class="del" onclick="del(this)">✖</span>' +
                '</td>' +
                '</tr>'
            tbody.innerHTML = html;
        }
    })
}
//判断当传入的数据text判断， 这是没有使用自定义data-id可以考虑优化删除，待续
query.onclick = function () {
    //获取select中别选中的文本 .text ,  属性值 .value
    var selText = unit.options[unit.options.selectedIndex].text;
    getSelData(MoneyList, selText);
}

//2、添加
add.onclick = function () {
    if (person.value === '' || getUnit.value === '' || money.value === '' || date.value === '') {
        alert('请填写完整！')
        return false;
    }
    var newAdd = addMoneyList(person.value, +getUnit.value, +money.value, date.value);
    //将数据添加到数据库（数组）中
    MoneyList.push(newAdd);
    // console.log(newAdd)
    //刷新尾页
    getData(MoneyList, pageTotol);
    //更新当前页面和总页码
    updataPage(MoneyList);
    //当添加数据后，将当前页码改为最后一页码
    pageCurrent.innerHTML = pageNum.innerHTML;
    //情况表单中的数据
    person.value = money.value = date.value = '';
}

//3、删除
$('#t_body').on('click', '.del', function () {
    //获取每行的序号
    var indexNum = $(this).parent().parent().find('td:first-child').html();
    // 删除数组中的指定元素
    MoneyList.splice(indexNum - 1, 1);
    //更新每行的ID；
    var id = 0;
    MoneyList.forEach(function (value, index) {
        value.id = ++id;
    })
    //获取当前的页码
    var pageIndex = pageCurrent.innerHTML - 1;
    //判断如果查询单位中的值，删除数据，刷新当前页面
    var unitText = $('#s_select').find('option:selected').html();
    // console.log(unitText);
    if (unitText !== '--请选择--') {
        getSelData(MoneyList, unitText);
    } else {
        //刷新当前页面
        getData(MoneyList, pageIndex);
        //更新当前页面和总页码
        updataPage(MoneyList);
    }
})

//4、修改
$('#t_body').on('click', '.redact', function () {
    //获取tr
    var tr = $(this).parent().parent();
    var trPname = tr.find('td:eq(1)');
    var trUnit = tr.find('td:eq(2)');
    var trMoney = tr.find('td:eq(3)');
    var trDate = tr.find('td:eq(4)');
    //判断切换修改和确定
    if ($(this).html() === '✎') {
        //改变样式确定
        $(this).html('✔');
        //设置修改输入框
        trPname.html('<input type="text" class="rewriteInput" value="' + trPname.html() + '">');
        trUnit.html('<select name="unit" id="newSelect" class="getUnit"><option value="">' + trUnit + '</option></select>');
        trMoney.html('<input type="number" class="rewriteInput" value="' + trMoney.html() + '">');
        trDate.html('<input type="text" class="rewriteInput rewriteDate" id="J-xl" value="' + trDate.html() + '">');
        //添加捐款选项
        getSel($('#newSelect')[0], 'set');
        console.log($('#newSelect')[0]);
        //修改时，不能添加，去掉日期ID
        $('.date').attr('id', '');

    } else {
        //改变样式
        $(this).html('✎');
        //重新赋值
        trPname.html(trPname.find('input').val());
        trUnit.html(trUnit.find('option:selected').html());
        trMoney.html(trMoney.find('input').val());
        trDate.html(trDate.find('input').val());
    }
})
//点击修改的日历，弹出日历插件
$('#t_body').on('focus', '.rewriteDate', function () {
    //日历的控件
    laydate({
        elem: '#J-xl'
    });
})

//-------------------------五、简单的封装-------------------------------
//1、封装更新当前页码和总页码
function updataPage(MoneyList) {
    pageTotol = Math.floor(MoneyList.length / 10);
    pageNum.innerHTML = Math.ceil(MoneyList.length / 10);
}

//2、封装加载表格数据
function getData(data, i, id) {
    var html = '';
    //变量捐款moneylist数据
    data.map(function (value, index) {
        var arrList = [];
        // console.log(value);
        // 取出10个数据
        if (index >= pageSize * i && index < pageSize * (i + 1)) {
            arrList.push(value);
            // console.log(arrList)
            //遍历捐款单位
            OrgList.map(function (Ovalue) {
                if (Ovalue.orgid === value.orgid) {
                    value.orgid = Ovalue.name;
                }
                return Ovalue.name;
            })
            //将数据添加到页面中
            html += '<tr>' +
                '<td>' + value.id + '</td>' +
                '<td>' + value.Pname + '</td>' +
                '<td>' + value.orgid + '</td>' +
                '<td>' + value.money + '</td>' +
                '<td>' + value.date + '</td>' +
                '<td>' +
                '<span class="redact">✎</span>' +
                '<span class="del">✖</span>' +
                '</td>' +
                '</tr>'
            tbody.innerHTML = html;
        }
    })
}

//3、封装将单位选项添加到select中
function getSel(selUnit, isSel) {
    var selStr = '',
        selArr = [];
    //判断选择是否添加前缀
    selStr = isSel === 'get' ? '<option value="0">--请选择--</option>' : selStr;
    //遍历捐款单位
    selArr = OrgList.map(function (Ovalue) {
        return Ovalue;
    })
    //将获取的单位名称数组添加到页面中
    selArr.map(function (Svalue, Sindex) {
        selStr += '<option value="' + (Sindex + 1) + '">' + Svalue.name + '</option>';
        selUnit.innerHTML = selStr;
    })
}

}