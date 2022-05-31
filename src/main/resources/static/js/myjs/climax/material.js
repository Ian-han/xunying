var _oTableInit =  $('#tb_materials');

function init (){

    var tableColumns = [
        {checkbox: true},
        {field: 'materialInfoId', title: '序号', align: 'center',sortable: true},
        {field: 'contractNumber', title: '合同编号', align: 'center'},
        {field: 'materialNumber', title: '物料号', align: 'center'},
        {field: 'materialName', title: '物料名称', align: 'center'},
        {field: 'operCount', title: '操作数量', align: 'center'},
        {field: 'stockPrice', title: '进货单价', align: 'center'},
        {field: 'operStatus', title: '操作状态', align: 'center'},
        {field: 'operDate', title: '操作时间', align: 'center',sortable: true, formatter:function (value) {return formatDate(value)}},
        {field: 'operUser', title: '经手人', align: 'center'},
        {field: 'remainCount', title: '剩余库存', align: 'center'},
        {field: 'remark', title: '备注', align: 'center'},
        {field: 'operation', title: '更改', align: 'center', events:operateEvents, formatter:addFunctionAlty}
    ];

    _oTableInit.bootstrapTable('destroy');

    _oTableInit.bootstrapTable({
        ajax:function(request){                    //使用ajax请求
            $.ajax({
                type:"GET",
                url:getRootPath_web() + '/climax/getMaterialInfo',
                contentType:'application/json;charset=utf-8',
                dataType:'json',
                data:request.data,
                success:function (res) {
                    request.success({
                        //row:res.resultMsg,
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

function formatDate(value) {
    if (value !=  null &&  Number.isInteger(value)){
        var date = new Date(parseInt(value));
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
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
        $("#modal_material_id").val(row.materialInfoId);
        $("#modal_contract_no").val(row.contractNumber);
        $("#modal_material_no").val(row.materialNumber);
        $("#modal_material_name").val(row.materialName);
        $("#modal_oper_count").val(row.operCount);
        $("#modal_price").val(row.stockPrice);
        $("#modal_oper_status").val(row.operStatus);
        $("#modal_oper_date").val(formatDate(row.operDate));
        $("#modal_oper_userId").val(row.operUser);
        $("#modal_remain_count").val(row.remainCount);
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

// function selectOnchang(obj){
//     if (obj.selectedIndex == 0){
//         $("#modal_price_group").removeClass('hidden');
//     }else {
//
//         $("#modal_price_group").removeClass('hidden');
//         $("#modal_price_group").addClass('hidden');
//     }
// };

$("#btn_add").click(function(){
    document.getElementById("modal_id").value = null;
    document.getElementById("modal_material_id").value = null;
    document.getElementById("modal_contract_no").value = null;
    document.getElementById("modal_material_no").value = null;
    document.getElementById("modal_material_name").value = null;
    document.getElementById("modal_oper_count").value = null;
    document.getElementById("modal_price").value = null;
    document.getElementById("modal_oper_status").value = null;
    document.getElementById("modal_oper_date").value = null;
    document.getElementById("modal_oper_userId").value = null;

    document.getElementById("modal_remain_count").value = null;
    document.getElementById("modal_remark").value = null;
    $("#editModal").modal();
});

$("#save-edit-btn").click(function () {
    $('#editModal').modal('hide');
    var modal_id = $("#modal_id").val();
    var modal_material_id = $("#modal_material_id").val();
    var modal_contract_no = $("#modal_contract_no").val();
    var modal_material_no = $("#modal_material_no").val();
    var modal_material_name = $("#modal_material_name").val();
    var modal_oper_count = $("#modal_oper_count").val();
    var modal_price = $("#modal_price").val();
    var modal_oper_status = $("#modal_oper_status").val();
    var modal_oper_date = $("#modal_oper_date").val();
    var modal_oper_userId = $("#modal_oper_userId").val();
    var modal_remain_count = $("#modal_remain_count").val();
    var modal_remark = $("#modal_remark").val();

    var materialObj = new Object();
    materialObj.materialInfoId = modal_material_id;
    materialObj.contractNumber = modal_contract_no;
    materialObj.materialNumber = modal_material_no;
    materialObj.materialName = modal_material_name;
    materialObj.operCount = modal_oper_count;
    materialObj.stockPrice = modal_price;
    materialObj.operStatus = modal_oper_status;
    materialObj.operDate = new Date(Date.parse(modal_oper_date.replace(/-/g,  "/")));
    materialObj.operUser = modal_oper_userId;
    materialObj.remainCount = modal_remain_count;
    materialObj.remark = modal_remark;

    var materialInfoJson = JSON.stringify(materialObj);


    if (modal_id == ""){
        var count = _oTableInit.bootstrapTable('getData').length;
        _oTableInit.bootstrapTable("insertRow",{
            index:count+1,
            row:{
                materialInfoId:modal_material_id,
                contractNumber:modal_contract_no,
                materialNumber:modal_material_no,
                materialName:modal_material_name,
                operCount:modal_oper_count,
                stockPrice:modal_price,
                operStatus:modal_oper_status,
                operDate:modal_oper_date,
                operUser:modal_oper_userId,
                remainCount:modal_remain_count,
                remark:modal_remark
            }
        });

        $.ajax({
            type : 'POST',
            data : materialInfoJson,
            dataType : 'json',
            contentType : 'application/json;charset=UTF-8',
            url : getRootPath_web() + '/climax/saveMaterialInfo',
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
                materialInfoId:modal_material_id,
                contractNumber:modal_contract_no,
                materialNumber:modal_material_no,
                materialName:modal_material_name,
                operCount:modal_oper_count,
                stockPrice:modal_price,
                operStatus:modal_oper_status,
                operDate:modal_oper_date,
                operUser:modal_oper_userId,
                remainCount:modal_remain_count,
                remark:modal_remark
            }
        });

        $.ajax({
            type : 'POST',
            data : materialInfoJson,
            dataType : 'json',
            contentType : 'application/json;charset=UTF-8',
            url : getRootPath_web() + '/climax/updateMaterialInfo',
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

$("#btn_edit_remainCount").click(function () {
    document.getElementById("modal_update_material_no").value = null;
    document.getElementById("modal_update_material_remain_count").value = null;
    $("#updateRemainCountModal").modal();
});

$("#update-remain-count-btn").click(function () {

    $('#updateRemainCountModal').modal('hide');
    var updateRemainCount = new Object();
    updateRemainCount.materialNumber = $("#modal_update_material_no").val();
    updateRemainCount.remainCount = $("#modal_update_material_remain_count").val();

    var updateRemainCountJson = JSON.stringify(updateRemainCount);

    $.ajax({
        type : 'POST',
        data : updateRemainCountJson,
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        url : getRootPath_web() + '/climax/updateMaterialRemainCount',
        success : function (data) {
            if("success" == data.resultMsg){
                console.log("update material remain count successfully")
            }else {

            }
        },
        error:function(error){
            console.log(error);
        },

    });

    init();
});



$("#modal_oper_date").datepicker({
    language : "zh-CN"
});
