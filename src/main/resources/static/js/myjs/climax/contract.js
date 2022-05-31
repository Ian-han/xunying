var _oTableInit =  $('#tb_contracts');

var _ModalProductTable = $('#tb_product_detail');

function init (){

    var tableColumns = [
        {checkbox: true},
       // {field: 'contractInfoId', title: '序号', align: 'center',sortable: true},
        {field: 'contractNumber', title: '合同编号', align: 'center',sortable: true},
        {field: 'productPurchaser', title: '客户(甲方)', align: 'center'},
        {field: 'contractAmount', title: '销售金额', align: 'center'},
        {field: 'deliverAddress', title: '交货地点', align: 'center'},
        {field: 'salesman', title: '业务员', align: 'center'},
        {field: 'contractDate', title: '合同签订日期', align: 'center',formatter:function (value) {return formatDate(value)}},
        {field: 'remark', title: '备注', align: 'center'},
        {field: 'operation', title: '更改', align: 'center', events:operateEvents, formatter:addFunctionAlty}
    ];

    _oTableInit.bootstrapTable('destroy');

    _oTableInit.bootstrapTable({
        ajax:function(request){                    //使用ajax请求
            $.ajax({
                type:"GET",
                url:getRootPath_web() + '/climax/getContractInfo',
                contentType:'application/json;charset=utf-8',
                dataType:'json',
                data:request.data,
                success:function (res) {
                    request.success({
                        row:res.resultMsg,
                    });
                    _oTableInit.bootstrapTable('load', res.resultMsg);
                },
                error:function(error){
                    console.log(error);
                }
            })
        },
        toolbar: '#toolbar',                //工具按钮用哪个容器
        // striped: true,                      //是否显示行间隔色
        contentType: "application/x-www-form-urlencoded",
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortOrder: "asc",                   //排序方式
        queryParams: _oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        height: $(window).height() - 200,
        // clickToSelect: true,                //是否启用点击选中行
        // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "num",                     //每一行的唯一标识，一般为主键列
        columns:tableColumns,
        //data:datas,
        // onLoadSuccess: function(res){  //加载成功时执行
        //     console.info("加载成功");
        //     console.log(res);
        // },

        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
    });


};

function initProDetailTable (){

    var proTableColumns = [
        {checkbox: true},
        {field: 'productInfoId', title: '序号', align: 'center',sortable: true},
        {field: 'productNumber', title: '产品号', align: 'center'},
        {field: 'productName', title: '产品名称', align: 'center'},
        {field: 'texture', title: '材质', align: 'center'},
        {field: 'operCount', title: '操作数量', align: 'center'},
        {field: 'unit', title: '单位', align: 'center'},
        {field: 'sellPrice', title: '单价', align: 'center'},
        {field: 'sellAmount', title: '销售金额', align: 'center', formatter:function (value,row,index)  {return autoEvaluation(value,row,index)}},
        {field: 'remark', title: '备注', align: 'center'}
    ];

    _ModalProductTable.bootstrapTable('destroy');

    _ModalProductTable.bootstrapTable({
        // ajax:function(request){                    //使用ajax请求
        //     $.ajax({
        //         type:"GET",
        //         url:getRootPath_web() + '/climax/getMaterialInfo',
        //         contentType:'application/json;charset=utf-8',
        //         dataType:'json',
        //         data:request.data,
        //         success:function (res) {
        //             request.success({
        //                 //row:res.resultMsg,
        //             });
        //             _oTableInit.bootstrapTable('load', res.resultMsg);
        //         },
        //         error:function(error){
        //             console.log(error);
        //         }
        //     })
        // },
        toolbar: '#modal_toolbar',                //工具按钮用哪个容器
        // striped: true,                      //是否显示行间隔色
        contentType: "application/x-www-form-urlencoded",
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
       // pagination: true,                   //是否显示分页（*）
        sortOrder: "asc",                   //排序方式
        queryParams: _ModalProductTable.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
       // pageSize: 5,                       //每页的记录行数（*）
        // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
       // height: $(window).height() - 200,
        // clickToSelect: true,                //是否启用点击选中行
        // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        //uniqueId: "num",                     //每一行的唯一标识，一般为主键列
        columns:proTableColumns,
        //data:datas,
        // onLoadSuccess: function(res){  //加载成功时执行
        //     console.info("加载成功");
        //     console.log(res);
        // },

        onClickCell: function(field, value, row, $element) {
            $element.attr('contenteditable', true);
            $element.blur(function() {
                let index = $element.parent().data('index');
                let tdValue = $element.html();

                saveData(index, field, tdValue);
            })
        },

        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
    });


};

function saveData(index, field, value) {
    _ModalProductTable.bootstrapTable('updateCell', {
        index: index,       //行索引
        field: field,       //列名
        value: value        //cell值
    })
};


function autoEvaluation(value,row,index) {
    if (row.operCount != null && row.sellPrice != null){
        value = parseFloat(row.operCount) * parseFloat(row.sellPrice);
    }
    return Math.round(value*100)/100;
}

function formatDate(value) {
    if (value !=  null &&  Number.isInteger(value)){
        var date = new Date(parseInt(value));
        return date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear();
    }else {
        return value;
    }
}

// 修改按钮、删除按钮
function addFunctionAlty(value, row, index) {
    return [
        '<button type="button" id="btn_edit" class="btn btn-default" data-toggle="modal" data-target="#ModalInfo">修改</button>  ',
        '<button id="btn_delete" class="btn btn-warning">删除</button>'
    ].join('');
};

window.operateEvents = {

    // 点击修改按钮执行的方法
    'click #btn_edit': function (e, value, row, index) {
        // $("#modal_id").val(index);
        // $("#modal_material_id").val(row.materialInfoId);
        // $("#modal_contract_no").val(row.contractNumber);
        // $("#modal_material_no").val(row.materialNumber);
        // $("#modal_material_name").val(row.materialName);
        // $("#modal_oper_count").val(row.operCount);
        // $("#modal_price").val(row.stockPrice);
        // $("#modal_oper_status").val(row.operStatus);
        // $("#modal_oper_date").val(formatDate(row.operDate));
        // $("#modal_oper_userId").val(row.operUser);
        // $("#modal_remain_count").val(row.remainCount);
        // $("#modal_remark").val(row.remark);
        // $("#editModal").modal();
    },
    // 点击删除按钮执行的方法
    'click #btn_delete': function (e, value, row, index) {
        // 写自己的方法。。。
    }
};

$(window).resize(function() {
    _oTableInit.bootstrapTable('resetView', {
        height: $(window).height() - 200
    });
});

$(function(){
    init();//启动表格插件
});

$("#btn_add").click(function(){
    // document.getElementById("modal_id").value = null;
    // document.getElementById("modal_name").value = null;
    // document.getElementById("modal_texture").value = null;
    // document.getElementById("modal_number").value = null;
    // document.getElementById("modal_unit").value = null;
    // document.getElementById("modal_price").value = null;
    // document.getElementById("modal_price").value = null;
    // document.getElementById("modal_amount").value = null;
    // document.getElementById("modal_remark").value = null;
    $("#editModal").modal();
    initProDetailTable ();
});

$("#close-btn").click(function(){
    init();
});

$("#modal_btn_add").click(function(){
    var count = _ModalProductTable.bootstrapTable('getData').length;
    // newFlag == 1的数据为新规的数据
    _ModalProductTable.bootstrapTable('insertRow',{index:count,row:{newFlag:"1"}});
   // initProDetailTable ();
});

$("#modal_btn_remove").click(function(){
    // var rows = _ModalProductTable.bootstrapTable('getSelections');
    //
    // if (rows.length == 0){
    //     alert("请选择要删除的记录！");
    //     return;
    // }else {
    //     var arrays = new Array();
    //     $(rows).each(function () {
    //         arrays.push(this.productInfoId);
    //     });
    // }
});

$('#datepicker').datepicker({
    format: 'mm-dd-yyyy',
    locale: 'zh-cn',
    autoclose:true,
    todayBtn: "linked",
    todayHighlight: true

    //defaultDate: "2028-1-1"
});


$("#save-edit-btn").click(function () {
    $('#editModal').modal('hide');
   // var modal_id = $("#modal_id").val();
    var contractNumber = null;
    var productPurchaser = $("#productPurchaser").val();
    var productSeller = $("#productSeller").val();
    var datepicker = $("#datepicker").val();
    var deliverAddress = $("#deliverAddress").val();
    var salesman = $("#salesman").val();
    var qualityClauses = $("#qualityClauses").val();
    var paymentMethod = $("#paymentMethod").val();
    var chargingMethod = $("#chargingMethod").val();
    var othersClauses = $("#othersClauses").val();
    var remark = $("#remark").val();


    var contNoJsonObj = null;

    $.ajax({
        type:"GET",
        url:getRootPath_web() + '/climax/getContractNos',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        //data:request.data,
        success:function (res) {
           // console.log(res.resultMsg)
            contNoJsonObj = res.resultMsg;

            var contractNos = new Array();
            if (contNoJsonObj != null){
                for (var i=0; i < contNoJsonObj.length; i++ ){
                    contractNos[i] = contNoJsonObj[i].replace("xy","");
                }
                contractNos.sort();
                contractNumber = "xy" + (parseInt(contractNos[contractNos.length-1])+1);
            }else {
                // initial contract number
                contractNumber = "xy" + 6000001;
            }

            var allData = _ModalProductTable.bootstrapTable('getData');
            var amount = null;
            if (allData != null){
                $.each(allData, function (i,e) {
                    amount += Math.round(parseFloat(e.operCount) * parseFloat(e.sellPrice)*100)/100;

                    var productObj = new Object();
                    productObj.contractNumber = contractNumber;
                    productObj.productNumber = e.productNumber;
                    productObj.productName = e.productName;
                    productObj.texture = e.texture;
                    productObj.operStatus = "合约";
                    productObj.operCount = e.operCount;
                    productObj.unit = e.unit;
                    productObj.sellPrice = e.sellPrice;
                    productObj.productPurchaser = productSeller;
                    productObj.operDate = new Date(Date.parse(datepicker.replace(/-/g,  "/")));
                    productObj.operUser = salesman;
                    productObj.remark = e.remark;

                    var productObjJson = JSON.stringify(productObj);

                    $.ajax({
                        type : 'POST',
                        data : productObjJson,
                        dataType : 'json',
                        contentType : 'application/json;charset=UTF-8',
                        url : getRootPath_web() + '/climax/saveProductInfo',
                        success : function (data) {
                            if("success" == data.resultMsg){

                            }else {

                            }
                        },
                    });
                });

            }

            var contractObj = new Object();
            contractObj.contractNumber = contractNumber;
            contractObj.productPurchaser = productPurchaser;
            contractObj.productSeller = productSeller;
            contractObj.contractAmount = amount;
            contractObj.contractDate = new Date(Date.parse(datepicker.replace(/-/g,  "/")));
            contractObj.deliverAddress = deliverAddress;
            contractObj.salesman = salesman;
            contractObj.qualityClauses = qualityClauses;
            contractObj.paymentMethod = paymentMethod;
            contractObj.chargingMethod = chargingMethod;
            contractObj.othersClauses = othersClauses;
            contractObj.remark = remark;

            var contractObjJson = JSON.stringify(contractObj);

            $.ajax({
                type : 'POST',
                data : contractObjJson,
                dataType : 'json',
                contentType : 'application/json;charset=UTF-8',
                url : getRootPath_web() + '/climax/saveContractInfo',
                success : function (data) {
                    if("success" == data.resultMsg){

                    }else {

                    }
                },
            });

        },
        error:function(error){
            console.log(error);
        }
    });





    init();

});
//
// $("#btn_edit_remainCount").click(function () {
//     document.getElementById("modal_update_material_no").value = null;
//     document.getElementById("modal_update_material_remain_count").value = null;
//     $("#updateRemainCountModal").modal();
// });
//
// $("#update-remain-count-btn").click(function () {
//
//     $('#updateRemainCountModal').modal('hide');
//     var updateRemainCount = new Object();
//     updateRemainCount.materialNumber = $("#modal_update_material_no").val();
//     updateRemainCount.remainCount = $("#modal_update_material_remain_count").val();
//
//     var updateRemainCountJson = JSON.stringify(updateRemainCount);
//
//     $.ajax({
//         type : 'POST',
//         data : updateRemainCountJson,
//         dataType : 'json',
//         contentType : 'application/json;charset=UTF-8',
//         url : getRootPath_web() + '/climax/updateMaterialRemainCount',
//         success : function (data) {
//             if("success" == data.resultMsg){
//                 console.log("update material remain count successfully")
//             }else {
//
//             }
//         },
//         error:function(error){
//             console.log(error);
//         },
//
//     });
//
//     init();
// });
//
//
//
// $("#modal_oper_date").datepicker({
//     language : "zh-CN"
// });
