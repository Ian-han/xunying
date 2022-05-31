var _oTableInit =  $('#tb_prodetails');

var _ModalProductTable = $('#tb_products_detail');

function init (){

    var tableColumns = [
        {checkbox: true},
        {field: 'productNo', title: '产品编号', align: 'center',sortable: true},
        {field: 'project', title: 'Project', align: 'center',sortable: true},
        {field: 'type', title: '产品类型', align: 'center'},
        {field: 'location', title: '产品位置', align: 'center'},
        {field: 'salesman', title: '业务员', align: 'center'},
        {field: 'date', title: '日期', align: 'center',formatter:function (value) {return formatDate(value)}},
        {field: 'matters', title: '注意事项', align: 'center'},
        {field: 'operation', title: '操作', align: 'center', events:operateEvents, formatter:addFunctionAlty}
    ];

    _oTableInit.bootstrapTable('destroy');

    _oTableInit.bootstrapTable({
        ajax:function(request){                    //使用ajax请求
            $.ajax({
                type:"GET",
                url:getRootPath_web() + '/climax/getProDetails',
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
        {field: 'size', title: '尺寸(mm)', align: 'center'},
        {field: 'quantity', title: '数量', align: 'center'},
        {field: 'note', title: '备注', align: 'center'},
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
        '<button type="button" id="btn_edit" class="btn btn-default" data-toggle="modal" data-target="#ModalInfo">修改</button>',
        '<button id="btn_delete" class="btn btn-warning">删除</button>'
    ].join('');
};

window.operateEvents = {

    // 点击修改按钮执行的方法
    'click #btn_edit': function (e, value, row, index) {
        $("#editProdetailsModal").modal();
        initProDetailTable ();

        $("#productNo").val(row.productNo);
        $("#productProject").val(row.project);
        $("#productType").val(row.type);
        $("#productLocation").val(row.location);
        $("#salesman").val(row.salesman);
        $("#datepicker").val(row.date);
        $("#matters").val(row.matters);

        $.ajax({
            type : 'POST',
            dataType : 'json',
            data : row.productNo,
            contentType : 'application/json;charset=UTF-8',
            url : getRootPath_web() + '/climax/getProdetailsByProductNo',
            success : function (res) {
                //console.log(res.resultMsg);
                var count = _ModalProductTable.bootstrapTable('getData').length;
                var proDeta = res.resultMsg;
                for (var i=0; i<proDeta.length; i++){
                    var row = {
                        size : proDeta[i].size,
                        quantity : proDeta[i].quantity,
                        note : proDeta[i].note,
                    }
                    _ModalProductTable.bootstrapTable('insertRow',{
                                        index:count,
                                        row:row
                    });
                }

            },
            error:function(error){
                        console.log(error);
            }
        });

    },
    // 点击删除按钮执行的方法
    'click #btn_delete': function (e, value, row, index) {
        bootbox.confirm("删除记录后不可恢复，确认删除？", function (result) {
            if (result){ // 点了确定
                $.ajax({
                     type : 'POST',
                     //dataType : 'json',
                     data : row.productNo,
                     contentType : 'application/json;charset=UTF-8',
                     url : getRootPath_web() + '/climax/deleteProdetailsByProductNo',
                     success : function (res) {
                         if (res.resultMsg == "success"){

                         }else{

                         }
                     },
                     error:function(error){
                         console.log(error);
                     }
                 });
                 init();
            }else {

            }



        })


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
    $("#editProdetailsModal").modal();
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
     var rows = _ModalProductTable.bootstrapTable('getSelections');
     var productNo = $("#productNo").val();

     if (rows.length == 0){
         alert("请选择要删除的记录！");
         return;
     }else {
         var arrays = new Array();
         $(rows).each(function () {
             var deleteKeyObj = new Object();
             deleteKeyObj.productNo = productNo;
             deleteKeyObj.size = this.size;

             var deleteKeyObjJson = JSON.stringify(deleteKeyObj);


              bootbox.confirm("确认删除这些记录？", function (result) {
                         if (result){ // 点了确定
                            $.ajax({
                              type : 'POST',
                              data : deleteKeyObjJson,
                              contentType : 'application/json;charset=UTF-8',
                              url : getRootPath_web() + '/climax/deleteProdetailsByProductNoAndSize',
                              success : function (res) {
                                  if (res.resultMsg == "success"){

                                  }else{

                                  }
                              },
                              error:function(error){
                                  console.log(error);
                              }
                          });

                         }else {

                         }
                     })

         });
         $('#tb_products_detail').bootstrapTable('refresh');
         //initProDetailTable();
         //init();
     }
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
    $('#editProdetailsModal').modal('hide');
   // var modal_id = $("#modal_id").val();
    var productNo = $("#productNo").val();
    var productProject = $("#productProject").val();
    var productType = $("#productType").val();
    var productLocation = $("#productLocation").val();
    var salesman = $("#salesman").val();
    var datepicker = $("#datepicker").val();
    var size = _ModalProductTable.bootstrapTable('getData').size;
    var quantity = $("#quantity").val();
    var note = $("#note").val();
    var matters = $("#matters").val();


    //var contNoJsonObj = null;



    var allData = _ModalProductTable.bootstrapTable('getData');
    if (allData != null){
        $.each(allData, function(i, e){
            var prodetailsObj = new Object();
            prodetailsObj.productNo = productNo;
            prodetailsObj.project = productProject;
            prodetailsObj.type = productType;
            prodetailsObj.location = productLocation;
            prodetailsObj.salesman = salesman;
            prodetailsObj.date = new Date(Date.parse(datepicker.replace(/-/g,  "/")));
            prodetailsObj.size = e.size;
            prodetailsObj.quantity = e.quantity;
            prodetailsObj.note = e.note;
            prodetailsObj.matters = matters;


            var prodetailsObjJson = JSON.stringify(prodetailsObj);

            $.ajax({
                type : 'POST',
                data : prodetailsObjJson,
                dataType : 'json',
                contentType : 'application/json;charset=UTF-8',
                url : getRootPath_web() + '/climax/saveProdetails',
                success : function (data) {
                    if("success" == data.resultMsg){

                    }else if ("duplicated" == data.resultMsg){
//                       alert("尺寸不能重复！");
//                       return false;
                    }
                },
                error:function(error){
                            console.log(error);
                }
            });
        });
    }
    init();

});

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
