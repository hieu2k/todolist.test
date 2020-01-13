$(document).ready(function (){
    $(".addWork input.Write-work").on("focus",function(){
        $(this).addClass("focus");
    })
    $(".addWork input.Write-work").on("blur",function(){
        if ($(this).val() == "") {
            $(this).removeClass("focus");
        }
    })
})