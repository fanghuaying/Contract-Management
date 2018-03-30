$(function() {
    // 测试环境
    var base_url = "http://cssup.test.shbaoyuantech.com/api";
    // 正式环境
    // var base_url = "https://cssup.shbaoyuantech.com/api";
    var sourceLi = [];
    var grade = '';
    var transferStore = {};
    var shiftGetCc = {};
    var subject_id = '';
    var grade_id = ''; 

    if(document.cookie == ''){
        alert('请先登录')
        window.location.href = 'login.html';
    }else{
        // 进入页面获取线索和场馆信息
        source();
        getStore();
    };

    /*-------------------------------*/
    /*         合同（国文）           */
    /*-------------------------------*/
    // 合同搜索
    $('.contentCheck').click(function() {
        if ($('.contentInput').val() == '') {
            alert('请输入合同号')
        } else {
            test();
        }
    })
    // 调合同接口
    function test() {
        var conInputTest = $('.contentInput').val()
        $.ajax({
            type: "GET",
            url: base_url + "/contract_info",
            dataType: "json",
            data: {
                'contract_no': conInputTest
                // 'contract_no': 'SH08130712283'
            },
            success: conSeccFunction,
            error: conErrFunction
        });
    }
    // 渲染合同表格
    function conSeccFunction(res) {
        if (res.code == '0') {
            var data = res.data;
            var conHtml = '';
            var leHtml = '';
            var threeHtml = '';
            for (var i in data) {
                conHtml += contentHtml(i, data[i]);
                var isDate = data[i].lead;
                for (var o in isDate) {
                    threeHtml += leadHtml(o, isDate[o])
                }
                leHtml += threeHtml + secHtml()
                $('.upLead').html(leHtml)
            }
            $('.upContent').html(conHtml)
        }else if(res.code == '1') {
            var msg = res.msg;
            alert(msg)
        }
    }



    /*-------------------------------*/
    /*         合同（国艺）           */
    /*-------------------------------*/
    // 合同搜索
    $('.artContentCheck').click(function() {
        if ($('.artContentInput').val() == '') {
            alert('请输入合同号')
        } else {
            artTest();
        }
    })
    // 调合同接口
    function artTest() {
        var artConInputTest = $('.artContentInput').val()
        $.ajax({
            type: "GET",
            url: base_url + "/guoyi/contract_info",
            dataType: "json",
            data: {
                'contract_no': artConInputTest
                // 'contract_no': 'SH08130712283'
            },
            success: artSeccFunction,
            error: conErrFunction
        });
    }
    // 渲染表格
    function artSeccFunction(res) {
        if (res.code == '0') {
            var data = res.data;
            var conHtml = '';
            var leHtml = '';
            var threeHtml = '';
            for (var i in data) {
                conHtml += contentHtml(i, data[i]);
                var isDate = data[i].lead;
                for (var o in isDate) {
                    threeHtml += leadHtml(o, isDate[o])
                }
                leHtml += threeHtml + secHtml()
                $('.artUpLead').html(leHtml)
            }
            $('.artUpContent').html(conHtml)
        }else if(res.code == '1') {
            var msg = res.msg;
            alert(msg)
        }
    }




    /*-------------------------------*/
    /*          线索（国文）          */
    /*-------------------------------*/
    // 线索搜索
    $('.search').click(function() {
        if (($('.mobileInput').val() == '') && ($('.nameInput').val() == '')) {
            alert('请输入手机号或姓名')
        } else {
            lead();
        }
    })
    // 调线索接口
    function lead() {
        var mobInput = $('.mobileInput').val()
        var nameInput = $('.nameInput').val()
        $.ajax({
            type: "GET",
            url: base_url + "/lead",
            dataType: "json",
            data: {
                'name': mobInput,
                'mobile': nameInput
            },
            success: leadSeccFunction,
            error: conErrFunction
        });
    }
    // 渲染线索表格
    function leadSeccFunction(res) {
        if (res.code == '0') {
            var leDe = res.data;
            var leHtml = '';
            var threeHtml = '';
            for (var i in leDe) {
                threeHtml += leadHtml(i, leDe[i])
            }
            leHtml += threeHtml + secHtml()
            $('.upLead').html(leHtml)
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }


    /*-------------------------------*/
    /*          线索（国艺）          */
    /*-------------------------------*/
    // 线索搜索
    $('.artSearch').click(function() {
        if (($('.artMobileInput').val() == '') && ($('.artNameInput').val() == '')) {
            alert('请输入手机号或姓名')
        } else {
            artLead();
        }
    })
    // 调线索接口
    function artLead() {
        var artMobInput = $('.artMobileInput').val()
        var artNameInput = $('.artNameInput').val()
        console.log(artNameInput)
        $.ajax({
            type: "GET",
            url: base_url + "/guoyi/lead",
            dataType: "json",
            data: {
                'name': artNameInput,
                'mobile': artMobInput
            },
            success: artLeadSeccFunction,
            error: conErrFunction
        });
    }
    // 渲染线索表格
    function artLeadSeccFunction(res) {
        if (res.code == '0') {
            var leDe = res.data;
            var leHtml = '';
            var threeHtml = '';
            for (var i in leDe) {
                threeHtml += leadHtml(i, leDe[i])
            }
            leHtml += threeHtml + secHtml()
            $('.artUpLead').html(leHtml)
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }


    
    /*-------------------------------*/
    /*      合同和线索绑定（国文）      */
    /*-------------------------------*/
    //点击提交时进行合同与线索关联前验证
    $('.refer').click(function() {
        if (window.confirm('你确定要将此合同与线索关联吗？')) {
            ref();
        } else {
            return false;
        }
    })
    // 确定提交
    function ref() {
        const conValue = $('.conInput:checked').val()
        const leadValue = $('.leadInput:checked').val()
        var isNew = '';
        var isSource = '';
        if($(".addCheck").is(':checked')) {
            if($('#dropName').text() == '请选择'){
                alert('请选择线索来源')
            } else {
                isSource = $('#dropName').html()
            }
        }

        isNew = (!leadValue == ' ') ? false : true
        $.ajax({
            type: "POST",
            url: base_url + "/contract/lead",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "contract_id": conValue,
                "lead": {
                    "lead_id": leadValue,
                    "is_new": isNew,
                    "source" : isSource
                }
            }),
            success: refSeccFunction,
            error: conErrFunction
        });
    }
    // 请求错误
    function conErrFunction() {
        alert('请求错误')
    }
    //提交成功
    function refSeccFunction(res) {
        if (res.code == '0') {
            alert('修改成功')
            test();
        } else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
       
    }


     /*-------------------------------*/
    /*      合同和线索绑定（国艺）      */
    /*-------------------------------*/
    //点击提交时进行合同与线索关联前验证
    $('.artRefer').click(function() {
        if (window.confirm('你确定要将此合同与线索关联吗？')) {
            artRef();
        } else {
            return false;
        }
    })
    // 确定提交
    function artRef() {
        const conValue = $('.conInput:checked').val()
        const leadValue = $('.leadInput:checked').val()
        var isNew = '';
        var isSource = '';
        if($(".addCheck").is(':checked')) {
            if($('#dropName').text() == '请选择'){
                alert('请选择线索来源')
            }else{
                isSource = $('#dropName').html()
            }
        }
        isNew = (!leadValue == ' ') ? false : true
        $.ajax({
            type: "POST",
            url: base_url + "/guoyi/contract/lead",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "contract_id": conValue,
                "lead": {
                    "lead_id": leadValue,
                    "is_new": isNew,
                    "source" : isSource
                }
            }),
            success: artRefSeccFunction,
            error: conErrFunction
        });
    }
    function artRefSeccFunction(res){
        if (res.code == '0') {
            alert('修改成功')
            artTest();
        } else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
       
    }



    /*-------------------------------*/
    /*          线索跨馆转移          */
    /*-------------------------------*/
    // 跨馆线索搜索
    $('.transSearch').click(function() {
        if (($('.transMobile').val() == '') && ($('.transName').val() == '')) {
            alert('请输入手机号或姓名')
        } else {
            tranLead();
        }
    })
    // 跨馆调线索接口
    function tranLead() {
        var transMobInput = $('.transMobile').val()
        var transNaInput = $('.transName').val()
        $.ajax({
            type: "GET",
            url: base_url + "/lead",
            dataType: "json",
            data: {
                'name': transMobInput,
                'mobile': transNaInput
            },
            success: transSeccFunction,
            error: conErrFunction
        });
    }
    // 跨馆渲染表格
    function transSeccFunction(res) {
        if (res.code == '0') {
            var tranDe = res.data;
            var tranHtml = '';
            for (var i in tranDe) {
                tranHtml += transfer(i, tranDe[i])
            }
            $('.transLead').html(tranHtml)
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }
    // 确认跨馆转移前验证
    $('.transButton').click(function(){
        if (($('.transMobile').val() == '') && ($('.transName').val() == '')) {
            alert('请先输入姓名或手机号')
        } else {
            if($('input:radio[name="transRadio"]:checked').val() == null) {
                alert('请先选择准备转馆的线索')
            }else{
                if($('input:radio[name="transRadio"]:checked').parents('tr').find('.storeName').text() == '请选择'){
                    alert('请选择要准备跨馆的场馆')
                }else{
                    if (window.confirm('你确定要将线索转移到此场馆吗？')) {
                        affirm();
                    } else {
                        return false;
                    }
                }
            }
        }
    })
    // 确认跨馆转移
    var storeId = '';
    $(document).on('click','.transfer-table .dropdown ul li',function(){
        storeId = $(this).val();
    })
    function affirm(){
        const transValue = $('.transInput:checked').val()
        $.ajax({
            type: 'POST',
            url: base_url + "/lead/store",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "lead_id": transValue,
                "store_id": storeId
            }),
            success: transferSeccFunction,
            error: conErrFunction
        })
    }
    // 请求成功
    function transferSeccFunction(res) {
        if (res.code == '0') {
            alert('修改成功')
            tranLead();
        } else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }





    /*-------------------------------*/
    /*          合同跨馆转移          */
    /*-------------------------------*/
    // 合同他跨馆线索搜索
    $('.shiftSearch').click(function(){
        if (($('.shiftInput').val() == '')) {
            alert('请输入合同号!')
        } else {
            shift();
        }
    })
    // 调合同接口
    function shift() {
        var shiftInputTest = $('.shiftInput').val()
        $.ajax({
            type: "GET",
            url: base_url + "/contract_info",
            dataType: "json",
            data: {
                'contract_no': shiftInputTest
                // 'contract_no': 'SH08130712283'
            },
            success: shiftSeccFunction,
            error: conErrFunction
        });
    }
    // 成功的回掉函数
    var shiftContractId = '';
    function shiftSeccFunction(res){
        if(res.code == 0){
            var data = res.data;
            shiftStoreId = res.data[0].store_id;
            var shiftCcId = res.data[0].cc_id;
            shiftContractId = res.data[0].contract_id;
            getCc(shiftCcId);
            var shiftAllHtml = ' ';
            shiftAllHtml += shiftHtml(data[0])
            $('.shiftLead').html(shiftAllHtml)
        } if(res.code == 1) {
            alert(res.msg)
        }
    }



    /*-------------------------------*/
    /*           同步新合同           */ 
    /*-------------------------------*/
    // 老合同搜索
    $('.meanCheck').click(function(){
        if ($('.meanInput').val() == '') {
            alert('请输入合同号')
        } else {
            oldMean();
        }
    })
    // 老合同搜索接口
    function oldMean(){
        var meanInputTest = $('.meanInput').val()
        $.ajax({
            type: "GET",
            url: base_url + "/cs/contract",
            dataType: "json",
            data: {
                'contract_no': meanInputTest
                // contract_no: 'SHY15180129001'
            },
            success: oldMeanSeccFunction,
            error: conErrFunction
        });
    }
    // 成功时渲染老合同表格
    function oldMeanSeccFunction(res){
        if(res.code == 0){
            var data = res.data;
            var firstHtml = '';
            for (var i in data){
                firstHtml += oldMeHtml(i,data[i])
            }
            $('.meanwhile-tab').html(firstHtml)
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }
    // 点击同步新合同
    $('.meanButton').click(function(){
        if ($('.meanInput').val() == '') {
            alert('请先输入合同号')
        } else {
            if($('input:radio[name="oldMeanRadio"]:checked').val() == null) {
                alert('请先选择准备同步到新库的合同号')
            }else{
                if (window.confirm('你确定要将此合同同步新库吗？')) {
                    newMean();
                } else {
                    return false;
                }
            }
        }
    })
    // 新合同接口
    function newMean(){
        const oldConId = $('.oldMeanInput:checked').val()
        $.ajax({
            type: 'POST',
            url: base_url + '/contract/migration',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({
                'contract_id': oldConId
            }),
            success: newMeanSeccFunction,
            errror: conErrFunction
        })
    }
    // 新合同渲染表格
    function newMeanSeccFunction(res){
        if(res.code == 0){
            var data = res.data;
            var newHtml = '';
            newHtml += newMeHtml(data)
            $('.meanwhile-newTab').html(newHtml)
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }





    /*-------------------------------*/
    /*              模板             */
    /*-------------------------------*/
    // 合同表格模板
    function contentHtml(index, res) {
        var isLead = res.is_lead
        var conNo = res.contract_no
        var conCc = res.cc
        var isLeadHtml = '';
        var trClass = '';
        var inputRedio = '';
        var point = '';
        if (isLead == '1') {
            isLeadHtml = '已有线索关联';
            trClass = 'noLead';
            inputRedio = 'disabled';
            point = '此合同已有线索不能进行关联'
            $('.refer').attr('disabled', 'true')
        } else {
            isLeadHtml = '无线索关联';
            $('.refer').removeAttr('disabled', 'true')
        }
        // conCc = (conCc == null) ?  ' ' : res.cc
        conNo = res.contract_no || ''
        conCc = res.cc || ''
        var conTemplete = (
            '<tr title=' + point + ' ' + 'class=' + trClass + '>' +
                '<td class="five"> ' + '<input class="conInput" type=radio name=conName ' + inputRedio + " " + 'value=' + res.contract_id + ' />' + '</td>' +
                '<td class="tr five">' + ((index >> 0) + 1) + '</td>' +
                '<td class="five">' + res.store_name + '</td>' +
                '<td class="eight">' + conCc + '</td>' +
                '<td class="fifteen">' + res.mobile + '</td>' +
                '<td class="ten">' + res.student_name + '</td>' +
                '<td class="fifteen">' + res.code + '</td>' +
                '<td class="fifteen">' + conNo + '</td>' +
                '<td class="six">' + res.lesson_cnt + '</td>' +
                '<td class="five">' + res.total_tuition + '</td>' +
                '<td class="secTel fifteen">' + isLeadHtml + '</td>' +
            '<tr/>'
        )
        return conTemplete;
    }
    // 线索表格模板
    function leadHtml(dat, leadDat) {
        var leadTemple = (
            '<tr>' +
                '<td class="five">' + '<input class="leadInput" type=radio name=leName value=' + leadDat.lead_id + ' />' + '</td>' +
                '<td class="five">' + ((dat >> 0) + 1) + '</td>' +
                '<td class="fifteen">' + leadDat.lead_name + '</td>' +
                '<td class="thirty">' + leadDat.lead_mobile + '</td>' +
                '<td class="twenty">' + leadDat.lead_source_name + '</td>' +
                '<td class="twenty">' + leadDat.store + '</td>' +
            '<tr/>'
        )

        return leadTemple;
    }
    // 新增线索来源模板
    function secHtml() {
        var sourceHtml = '';
        for(var i in sourceLi){
            sourceHtml += '<li><a href="#">'+sourceLi[i]+'</a></li>' 
        }
        var secHtml = (
            '<tr>' +
                '<td><input type=radio class=addCheck name=leName /></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td class="secTel">创建新线索并关联</td>' +
                '<td>' + 
                    '<div class="dropdown">' +
                        '<button '+ 
                            'class="btn btn-default dropdown-toggle source-button" '+
                            'type="button" id="dropdownMenu1" '+
                            'data-toggle="dropdown" '+
                            'aria-haspopup="true" '+
                            'aria-expanded="true">' +
                            '<div id=dropName>'+
                                '请选择'+
                            '</div>'+'<span class="caret"></span>'+
                        '</button>' +
                        '<ul class="but-scoll sour-li dropdown-menu" aria-labelledby="dropdownMenu1">' +
                            '<li class=sel><a href="#">'+'请选择'+'</a></li>' +sourceHtml+
                        '</ul>' +
                    '</div>' + 
                '</td>' +
                '<td>' + '</td>' +
            '<tr/>'
        )
        return secHtml;
    }
    // 线索跨馆转移模板
    function transfer(dat, leadDat) {
        var transferHtml = '';
        for (var i in transferStore){
            transferHtml += '<li value='+transferStore[i].store_id+'><a href="#">'+transferStore[i].store_name +'</a></li>'
        }
        var trans = (
            '<tr class='+((dat >> 0) + 1)+ '>' +
                '<td class="five">' + '<input class=transInput type=radio name=transRadio value='+leadDat.lead_id+' />' + '</td>' +
                '<td class="tr five">' + ((dat >> 0) + 1) + '</td>' +
                '<td class="fifteen">' + leadDat.lead_name + '</td>' +
                '<td class="fifteen">' + leadDat.lead_mobile + '</td>' +
                '<td class="fifteen">' + leadDat.lead_source_name + '</td>' +
                '<td class="fifteen">' + leadDat.store + '</td>' +
                '<td class="fifteen">' + 
                    '<div class="dropdown storeText">' +
                        '<button '+ 
                            'class="btn btn-default dropdown-toggle source-button" '+
                            'type="button" id="dropdownMenu1" '+
                            'data-toggle="dropdown" '+
                            'aria-haspopup="true" '+
                            'aria-expanded="true">' +
                            '<div class="storeName">'+
                                '请选择'+
                            '</div>'+'<span class="caret"></span>'+
                        '</button>' +
                        '<ul class="but-scoll sour-li dropdown-menu" aria-labelledby="dropdownMenu1">' +
                            '<li class=sel><a href="#">'+'请选择'+'</a></li>' +transferHtml+
                        '</ul>' +
                    '</div>' + 
                '</td>' +
            '<tr/>'
        )
        return trans;
    }
    // 老合同模板
    function oldMeHtml(index,res){
        var oldName = res.student_name;
        oldName = res.student_name || ' ';
        oldType = res.contract_type || ' ';

        var oldMeanTemple = (
            '<tr>' +
                '<td class="five">' + '<input class=oldMeanInput type=radio name=oldMeanRadio value='+ res.id +' />' + '</td>' +
                '<td class="tr ten">' + ((index >> 0) + 1) + '</td>' +
                '<td class="fifteen">' + res.contract_no + '</td>' +
                '<td  class="ten">' + res.cc + '</td>' +
                '<td  class="fifteen">' + oldName + '</td>' +   
                '<td class="ten">' +res.contract_department + '</td>' +
                '<td class="ten">' + res.contract_price + '</td>' +
                '<td  class="fifteen">' + oldType + '</td>' +
                '<td  class="ten">' + res.id + '</td>' +
            '<tr/>'
        )
        return oldMeanTemple;
    }
    // 新合同模板
    function newMeHtml(res){
        var newMeanTemple = (
            '<tr>' +
                '<td class="five">' + '<input class=newMeanInput type=radio name=newMeanRadio />' + '</td>' +
                '<td class="tr five">' +  "1" + '</td>' +
                '<td class="ten">' +res.contract_no + '</td>' +
                '<td class="ten">' + res.code + '</td>' +
                '<td class="ten">' + res.cc + '</td>' +
                '<td class="eight">' + res.student_name + '</td>' +
                '<td class="six">' + res.name + '</td>' +
                '<td class="six">' + res.store_name + '</td>' +
                '<td class="ten">' + res.mobile + '</td>' +
                '<td class="five">' + res.total_tuition + '</td>' +
                '<td class="six">' + res.lesson_cnt + '</td>' +
                '<td class="five">' + res.contract_id + '</td>' +
            '<tr/>'
        )
        return newMeanTemple;
    }
    // 合同跨馆转移模板
    function shiftHtml(res){
        var shiftCC = res.cc || ' ';
        var shiftName = res.name || ' ';
        var shiftStoreName = res.store_name || ' ';
        var shiftStoreHtml = '';
        for (var i in transferStore) {
            shiftStoreHtml += '<li value='+transferStore[i].store_id+'><a href="#">'+transferStore[i].store_name +'</a></li>'
        }
        var shiftTemple = (
            '<tr>' +
                '<td class="ten">' +  res.store_name + '</td>' +
                '<td class="five">' + shiftName  + '</td>' +
                '<td class="ten">' + res.mobile + '</td>' +
                '<td class="ten">' + res.student_name + '</td>' +
                '<td class="ten">' + res.contract_no + '</td>' +
                '<td class="five">' + res.lesson_cnt + '</td>' +
                '<td class="ten">' + res.total_tuition + '</td>' +
                '<td class="ten">' + res.create_time + '</td>' +
                '<td class="ten">' + 
                    '<div class="dropdown shiftStoreText">' +
                        '<button '+ 
                            'class="btn btn-default dropdown-toggle source-button" '+
                            'type="button" id="dropdownMenu1" '+
                            'data-toggle="dropdown" '+
                            'aria-haspopup="true" '+
                            'aria-expanded="true">' +
                            '<div class="shiftStoreName">'+
                            shiftStoreName+
                            '</div>'+'<span class="caret"></span>'+
                        '</button>' +
                        '<ul class="but-scoll sour-li dropdown-menu" aria-labelledby="dropdownMenu1">' +
                            '<li class=sel><a href="#">'+ shiftStoreName +'</a></li>' + shiftStoreHtml +
                        '</ul>' +
                    '</div>' +  
                '</td>' +
                '<td class="ten">' + 
                    '<div class="dropdown shiftCcText">' +
                        '<div class="dropdown shiftCcMenu">' +
                        '</div>' +  
                    '</div>' +  
                '</td>' +
            '<tr/>'
        )
        return shiftTemple;
    }
    // 调取CC接口时的模板
    function ccHtml(res,cc_id) {
        var ccNameList = res.data;
        var ccName = [];
        if (cc_id){
            ccName = ccNameList.filter(function(v,k){
                return v.cc_id == cc_id  
            })
        }
        var shiftCC = ccName[0] ? ccName[0].cc_name : '请选择';
        var shiftCcHtml = '';
        for (var k in ccNameList) {
            shiftCcHtml += '<li value='+ccNameList[k].cc_id+' staff_id='+ ccNameList[k].staff_id +'><a href="#">'+ccNameList[k].cc_name +'</a></li>'
        }
        var ccTemple = (
            '<button '+ 
                'class="btn btn-default dropdown-toggle source-button" '+
                'type="button" id="dropdownMenu1" '+
                'data-toggle="dropdown" '+
                'aria-haspopup="true" '+
                'aria-expanded="true">' +
                '<div class="shiftCcName">'+
                shiftCC+
                '</div>'+'<span class="caret"></span>'+
            '</button>' +
            '<ul class="but-scoll sour-li dropdown-menu" aria-labelledby="dropdownMenu1">' +
                '<li class=sel><a href="#">'+'请选择'+'</a></li>' + shiftCcHtml +
            '</ul>' 
        )
        return ccTemple;
    }
    


    /*-------------------------------*/
    /*           线索来源            */ 
    /*-------------------------------*/  

    // 点击来源列表
    $('.upLead').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#dropName').text($target.text())
    })
    $('.artUpLead').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#dropName').text($target.text())
    })
    // 选择来源接口
    function source() {
        $.ajax({
            type: 'GET',
            url: base_url + '/source',
            dataType: 'json',
            success: sourceFunction,
            error: conErrFunction
        })
    }
    // 来源成功的回调函数
    function sourceFunction(res) {
        if (code = '0') {
            sourceLi = res.source
        }else if (res.code == '1') {
            var msg = res.msg
            alert(msg)
        }
    }





    /*-------------------------------*/
    /*              获取场馆          */ 
    /*-------------------------------*/

    // 选择场馆接口
    function getStore(){
        $.ajax({
            type: 'GET',
            url: base_url + '/store',
            dataType: 'json',
            success: transferFunction,
            error: conErrFunction
        })
    }
    // 场馆成功的回调接口
    function transferFunction(res){
        if (code == '0') {
            transferStore = res.data
        } else if (res.code == '1') {
            alert(res.msg)
        }
    }
    // 线索页面  点击li,button同步显示
    $(document).on('click','.transLead',function(e){
        var $target = $(e.target);
        var isStore = $target.is('li a');
        if (isStore) {
            $target.parents('.storeText').find('.storeName').text($target.text())
        }
    })
    
    // 合同转馆 点击li,button同步显示
    $(document).on('click','.shiftLead',function(e){
        var $target = $(e.target);
        var isStore = $target.is('li a');
        if (isStore) {
            $target.parents('.shiftStoreText').find('.shiftStoreName').text($target.text())
        }
    })

    // 合同转馆 选择CC列表
    $(document).on('click','.shiftLead',function(e){
        var $target = $(e.target);
        var isCc = $target.is('li a');
        if (isCc) {
            $target.parents('.shiftCcText').find('.shiftCcName').text($target.text())
        }
    })

    /*-------------------------------*/
    /*              获取CC           */ 
    /*-------------------------------*/

    // 转馆
    var shiftStoreId = '';
    $(document).on('click','.shift-table .shiftStoreText ul li',function(){
        shiftStoreId = $(this).val();
        getCc();
    })
    // 获取CC列表
    function getCc (cc_id) {
        $.ajax({
            type: 'GET',
            url: base_url + '/cc',
            dataType:'json',
            data:{
                store_id: shiftStoreId,
            },
            success:function(res){
                shiftCcSeccFunction(res,cc_id)
            },
            error:conErrFunction
        })
    }
    // 获取cc成功后的回掉函数
    function shiftCcSeccFunction (res,cc_id) {
        if ( res.code == 0) {
            var ccList = ccHtml(res,cc_id);
            shiftGetCc = res.data.cc_name;
            $('.shiftCcMenu').html(ccList)
        } else if (res.code == 1) {
            alert(res.msg)
        }
    }


    /*-------------------------------*/
    /*              转馆             */ 
    /*-------------------------------*/
    // 确认转馆
    $('.shiftButton').click(function(){
        // console.log($('.shift-table .shiftCcText .shiftCcName').html())
        if($('.shift-table .shiftCcText .shiftCcName').html() == '请选择'){
            alert("请先选择CC")
        } else {
            shiftSbmit();
        }
    })
    // 拿值
    var ccId = '';
    var staffId = '';
    $(document).on('click','.shift-table .shiftCcText ul li',function(){
        ccId = $(this).val();
        staffId = parseInt($(this).attr('staff_id'))
    })
    // 确认转馆提交接口
    function shiftSbmit(){
        $.ajax({
            type: 'POST',
            url: base_url + '/contract_cc',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                store_id: shiftStoreId,
                cc_id: ccId,
                staff_id: staffId,
                contract_id:shiftContractId
            }),
            success:shiftSubmitFunction,
            error:conErrFunction
        })
    }
    // 转馆成功的回掉函数
    function shiftSubmitFunction(res) {
        if(res.code == 0){
            alert('您已转馆成功！');
        }else if(res.code == 1){
            alert(res.msg)
        }
    }

    /*-------------------------------*/
    /*        新增课程(国文)           */ 
    /*-------------------------------*/
    // 改变选择下拉框的类容
    $('.class-type').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#class-name-menu').text($target.text())
    })
    $('.class-delete').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#class-delete-menu').text($target.text())
    })
    $('.class-old').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#class-old-menu').text($target.text())
    })
    $('.class-grade').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#class-grade-menu').text($target.text())
        if($target.is('li a')){
            grade_id = $target.attr('value')
        }
    })
    // 获取年纪的数据
    getClass();
    function getClass() {
        $.ajax({
            type: 'GET',
            url: base_url + '/grade',
            success: classFunction,
            error: conErrFunction
        })
    }
    function classFunction (res){
        if(res.code == 0) {
            grade = res.data;
            var div1 = '<li><a href="#">';
            var div2 = '</a></li>';
            for(var i = 0; i < grade.length ; i++){
                $(".test").append('<li><a href="#" value='+ grade[i].id +'>' + grade[i].name +'</a></li>');
            }
        } else {
            alert(res.msg)
        }
    }
    // 点击提交
    $('.add-grade').on('click',function(){
        addCourse()
    });
    function addCourse() {
        var course_name = $('.class-name').val();
        var lesson_number = parseInt($('.class-number').val());
        var is_deleted = is_deleted;
        var is_old = is_old;
        var course_type = course_type;
        if($('#class-delete-menu').text() == '否'){
            is_deleted = 2;
        } else {
            is_deleted = 1;
        };
        if($('#class-old-menu').text() == '否'){
            is_old = 2;
        } else {
            is_old = 1;
        };
        if($('#class-name-menu').text() == '常规课'){
            course_type = 2;
        } else if ($('#class-name-menu').text() == '公益课') {
            course_type = 1;
        } else {
            course_type = 0;
        };
        console.log(course_name,lesson_number,is_deleted,is_old,course_type)
        if (course_name == ''){
            alert('请输入课程名')
        } else if(lesson_number == ''){
            alert('请输入课时数')
        } else if(lesson_number % 2 == 0){
            $.ajax({
                type: 'POST',
                url: base_url + '/add/course',
                contentType:  "application/json",
                dataType: 'json',
                data:JSON.stringify({
                    course_name: course_name,
                    lesson_hour: lesson_number,
                    is_deleted:  is_deleted,
                    is_old: is_old,
                    course_type: course_type,
                    grade_id:grade_id
                }),
                success: addCourseFunction,
                error: conErrFunction
            })
        } else {
            alert('课时数请输入整数！')
        }
    }
    function addCourseFunction(res) {
        if (res.code == 0){
            alert('您成功添加课程！')
        } else {
            alert(res.msg)
        }
    }



    /*-------------------------------*/
    /*        新增课程(国艺)           */ 
    /*-------------------------------*/
    // 改变选择下拉框的类容
    $('.art-class-type').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#art-class-name-menu').text($target.text());
    })
    $('.art-class-delete').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#art-class-delete-menu').text($target.text());
    })
    $('.art-class-old').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#art-class-old-menu').text($target.text());
    })
    $('.art-class-grade').on('click', function(e) {
        var $target = $(e.target);
        $target.is('li a') && $('#art-class-grade-menu').text($target.text());
        if($target.is('li a')){
            subject_id = $target.attr("value");
        }
    })
    // 获取科目的数据
    artGetClass();
    function artGetClass() {
        $.ajax({
            type: 'GET',
            url: base_url + '/guoyi/subject',
            success: artClassFunction,
            error: conErrFunction
        })
    }
    function artClassFunction (res){
        if(res.code == 0) {
            grade = res.data;
            var div1 = '<li><a href="#">';
            var div2 = '</a></li>';
            for(var i = 0; i < grade.length ; i++){
                $(".art-test").append('<li><a href="#" value=' + grade[i].id +'>' + grade[i].name +'</a></li>');
            }
        } else {
            alert(res.msg)
        }
    }

    $('.art-add-grade').on('click',function(){
        artAddCourse()
    });
    function artAddCourse() {
        console.log('点击')
        var course_name = $('.art-class-name').val();
        var lesson_number = parseInt($('.art-class-number').val());
        var is_deleted = is_deleted;
        var is_old = is_old;
        var course_type = course_type;
        if($('#art-class-delete-menu').text() == '否'){
            is_deleted = 2;
        } else {
            is_deleted = 1;
        };
        if($('#art-class-old-menu').text() == '否'){
            is_old = 2;
        } else {
            is_old = 1;
        };
        if($('#art-class-name-menu').text() == '常规课'){
            course_type = 2;
        } else if ($('#art-class-name-menu').text() == '公益课') {
            course_type = 1;
        } else {
            course_type = 0;
        };
        if (course_name == ''){
            alert('请输入课程名')
        } else if(lesson_number == ''){
            alert('请输入课时数')
        } else if(lesson_number % 2 == 0){
            $.ajax({
                type: 'POST',
                url: base_url + '/guoyi/add/course',
                contentType:  "application/json",
                dataType: 'json',
                data:JSON.stringify({
                    course_name: course_name,
                    subject_id:subject_id,
                    lesson_hour: lesson_number,
                    is_deleted:  is_deleted,
                    is_old: is_old,
                    course_type: course_type
                }),
                success: addCourseFunction,
                error: conErrFunction
            })
        } else {
            alert('课时数请输入整数！')
        }
    }
    function addCourseFunction(res) {
        if (res.code == 0){
            alert('您成功添加课程！')
        } else {
            alert(res.msg)
        }
    }

    



    // 点击重置时取消选中状态
    $('.rest').click(function() {
        $('input[name=conName]').removeAttr('checked')
        $('input[name=leName]').removeAttr('checked')
    })

    // 切换TAB
    $('.selsct').click(function(){
        var i = ($(this).index())-1;
        $('.content .menu').eq(i).show().siblings().hide();
    })
})