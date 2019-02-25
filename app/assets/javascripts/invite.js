$(document).ready(function(){
    let usersIDs = [];
    $("#invite-box").on("keypress", function(e){
	        
	 $(document).on("keyup keypress keydown","#order", function(e){
        
       	 if(e.keyCode == "13"){
            e.preventDefault();
            return 0;
       	   }
   	 })
        if(e.keyCode == "13"){
            console.log("hhhhh");
            e.preventDefault();
            target = {"name": $(this).val()};
            data = JSON.stringify(target);
            $.ajax({
                url: "/orders/invite.json",
                type: "POST",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (data) => {
                    let usersBox = $("#invited-people-list");
                    console.log(usersIDs.toString());
                    for(user of data){
                        //console.log(usersIDs);

                        if(usersIDs.includes(user.id))
                            continue;
                        usersIDs.push(user.id);
                        let userBox = $("<div class='col-md-5 m-1'></div>");
                        let userBoxRow = $("<div class='row text-center'></div>");
                        userBoxRow.append(
                            $(`<div class="col-sm-offset-1  col-sm-3">
					<div class='panel-success text-center'>
						<img src= '/images/1.jpeg' class='img-circle' alt='Cinque Terre' width='170' height='150'>
							<div class="textDesc text-center" align="center">
								<h4><code>${ user.name}</code></h4>
                                
                                <button class='btn btn-danger' id='${user.id}'>remove</button>
						    </div>
				   </div>
			</div>`)
                        );
                        // userBoxRow.append(
                        //     $("<div class='col-5 p-0 ml-4'><a href='/users/" + user.id + " class='font-weight-bold'>" + user.name + "</a><button class='btn btn-danger' id='" + user.id + "'>remove</button></div>")
                        // );
                        userBox.append(userBoxRow);

                        usersBox.append(userBox);
                        $(this).val("");
                    }
                    $("#order_invited_ids").val(usersIDs.toString());
                }
            });

        }
    });

    $("#invited-people-list").on('click', 'button', function(){
        usersIDs.splice(usersIDs.indexOf($(this).attr("id")), 1);
        $("#order_invited_ids").val(usersIDs.toString());
        $(this).parent().parent().parent().remove();
    });
/*     $("#order").submit(function(e){
        e.preventDefault();
        let url = $(this).attr("action");
        let data = $(this).serialize()+usersIDs;
        console.log(data);
        $.ajax({
            url: url,
            type: "POST",
            data: data
        });
        //console.log($(this).serialize()+usersIDs);

    }) */
});
