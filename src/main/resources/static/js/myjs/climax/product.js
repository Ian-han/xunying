var _oTableInit =  $('#tb_product');

function init (){

    var tableColumns = [
        {checkbox: true},
        {field: 'productInfoId', title: '序号', align: 'center',sortable: true},
        {field: 'contractNumber', title: '合同编号', align: 'center'},
        {field: 'productNumber', title: '产品号', align: 'center'},
        {field: 'productName', title: '产品名称', align: 'center'},
        {field: 'productType', title: '产品型号', align: 'center'},
        {field: 'texture', title: '材质', align: 'center'},
        {field: 'operStatus', title: '操作状态', align: 'center'},
        {field: 'operCount', title: '操作数量', align: 'center'},
        {field: 'unit', title: '单位', align: 'center'},
        {field: 'sellPrice', title: '售货单价', align: 'center'},
        {field: 'productPurchaser', title: '买方', align: 'center'},
        {field: 'operDate', title: '操作时间', align: 'center',sortable: true, formatter:function (value) {return formatDate(value)}},
        {field: 'operUser', title: '经手人', align: 'center'},
     //   {field: 'remainCount', title: '剩余库存', align: 'center'},
        {field: 'remark', title: '备注', align: 'center'},
        {field: 'operation', title: '更改', align: 'center', events:operateEvents, formatter:addFunctionAlty}
    ];

    _oTableInit.bootstrapTable('destroy');

    _oTableInit.bootstrapTable({
        ajax:function(request){                    //使用ajax请求
            $.ajax({
                type:"GET",
                url:getRootPath_web() + '/climax/getProductInfo',
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
        onLoadSuccess: function(res){  //加载成功时执行
            console.info("加载成功");
            console.log(res);
        },

        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        }
    });


};

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
        $("#modal_id").val(index);
        $("#modal_product_id").val(row.productInfoId);
        $("#modal_contract_no").val(row.contractNumber);
        $("#modal_product_no").val(row.productNumber);
        $("#modal_product_name").val(row.productName);
        $("#modal_product_type").val(row.productType);
        $("#modal_product_texture").val(row.texture);
        $("#modal_oper_status").val(row.operStatus);
        $("#modal_oper_count").val(row.operCount);
        $("#modal_oper_unit").val(row.unit);
        $("#modal_sell_price").val(row.sellPrice);
        $("#modal_product_purchaser").val(row.productPurchaser)
        $("#modal_oper_date").val(formatDate(row.operDate));
        $("#modal_oper_user").val(row.operUser);
      //  $("#modal_remain_count").val(row.remainCount);
        $("#modal_remark").val(row.remark);
        $("#editModal").modal();
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
    document.getElementById("modal_id").value = null;
    document.getElementById("modal_product_id").value = null;
    document.getElementById("modal_contract_no").value = null;
    document.getElementById("modal_product_no").value = null;
    document.getElementById("modal_product_name").value = null;
    document.getElementById("modal_product_type").value = null;
    document.getElementById("modal_product_texture").value = null;
    document.getElementById("modal_oper_status").value = null;
    document.getElementById("modal_oper_count").value = null;
    document.getElementById("modal_oper_unit").value = null;
    document.getElementById("modal_sell_price").value = null;
    document.getElementById("modal_product_purchaser").value = null;
    document.getElementById("modal_oper_date").value = null;
    document.getElementById("modal_oper_user").value = null;
 //   document.getElementById("modal_remain_count").value = null;
    document.getElementById("modal_remark").value = null;
    $("#editModal").modal();
});

$("#save-edit-btn").click(function () {
    $('#editModal').modal('hide');
    var modal_id = $("#modal_id").val();
    var modal_product_id = $("#modal_product_id").val();
    var modal_contract_no = $("#modal_contract_no").val();
    var modal_product_no = $("#modal_product_no").val();
    var modal_product_name = $("#modal_product_name").val();
    var modal_product_type = $("#modal_product_type").val();
    var modal_product_texture = $("#modal_product_texture").val();
    var modal_oper_status = $("#modal_oper_status").val();
    var modal_oper_count = $("#modal_oper_count").val();
    var modal_oper_unit = $("#modal_oper_unit").val();
    var modal_sell_price = $("#modal_sell_price").val();
    var modal_product_purchaser = $("#modal_product_purchaser").val();
    var modal_oper_date = $("#modal_oper_date").val();
    var modal_oper_user = $("#modal_oper_user").val();
  //  var modal_remain_count = $("#modal_remain_count").val();
    var modal_remark = $("#modal_remark").val();

    var productObj = new Object();
    productObj.productInfoId = modal_product_id;
    productObj.contractNumber = modal_contract_no;
    productObj.productNumber = modal_product_no;
    productObj.productName = modal_product_name;
    productObj.productType = modal_product_type;
    productObj.texture = modal_product_texture;
    productObj.operStatus = modal_oper_status;
    productObj.operCount = modal_oper_count;
    productObj.unit = modal_oper_unit;
    productObj.sellPrice = modal_sell_price;
    productObj.productPurchaser = modal_product_purchaser;
    productObj.operDate = new Date(Date.parse(modal_oper_date.replace(/-/g,  "/")));
    productObj.operUser = modal_oper_user;
  //  productObj.remainCount = modal_remain_count;
    productObj.remark = modal_remark;

    var productInfoJson = JSON.stringify(productObj);


    if (modal_id == ""){
        var count = _oTableInit.bootstrapTable('getData').length;
        _oTableInit.bootstrapTable("insertRow",{
            index:count+1,
            row:{
                productInfoId:modal_product_id,
                contractNumber:modal_contract_no,
                productNumber:modal_product_no,
                productName:modal_product_name,
                productType:modal_product_type,
                texture:modal_product_texture,
                operStatus:modal_oper_status,
                operCount:modal_oper_count,
                unit:modal_oper_unit,
                sellPrice:modal_sell_price,
                productPurchaser:modal_product_purchaser,
                operDate:modal_oper_date,
                operUser:modal_oper_user,
             //   remainCount:modal_remain_count,
                remark:modal_remark
            }
        });

        $.ajax({
            type : 'POST',
            data : productInfoJson,
            dataType : 'json',
            contentType : 'application/json;charset=UTF-8',
            url : getRootPath_web() + '/climax/saveProductInfo',
            success : function (data) {
                if("success" == data.resultMsg){

                }else {

                }
            },

            // error : function(e){
            //     alert(e.message())
            // }
        });

    }else {
        _oTableInit.bootstrapTable("updateRow",{
            index: modal_id,
            row:{
                productInfoId:modal_product_id,
                contractNumber:modal_contract_no,
                productNumber:modal_product_no,
                productName:modal_product_name,
                productType:modal_product_type,
                texture:modal_product_texture,
                operStatus:modal_oper_status,
                operCount:modal_oper_count,
                unit:modal_oper_unit,
                sellPrice:modal_sell_price,
                productPurchaser:modal_product_purchaser,
                operDate:modal_oper_date,
                operUser:modal_oper_user,
             //   remainCount:modal_remain_count,
                remark:modal_remark
            }
        });

        $.ajax({
            type : 'POST',
            data : productInfoJson,
            dataType : 'json',
            contentType : 'application/json;charset=UTF-8',
            url : getRootPath_web() + '/climax/updateProductInfo',
            success : function (data) {
                if("success" == data.resultMsg){

                }else {

                }
            },

            // error : function(e){
            //     alert(e.message())
            // }
        });
    }

    init();

});

$("#modal_oper_date").datepicker({
    language : "zh-CN"
});

