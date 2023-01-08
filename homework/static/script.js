//const { response } = require("express");

document.addEventListener("DOMContentLoaded", function () {
  set_temp();
  show_comment();
});

function save_comment() {
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  let today = new Date();
  let date = today.toLocaleDateString();
  var data = { name_give: name, comment_give: comment, date_give: date };
  if (name && comment) {
    fetch("/homework", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        let msg = data.msg;
        alert(msg);
      });
    window.location.reload();
  } else {
    alert("내용을 입력하세요");
  }
}

function set_temp() {
  fetch("http://spartacodingclub.shop/sparta_api/weather/seoul")
    .then((response) => response.json())
    .then((data) => {
      var tempNum = data.temp;
      var tempIcon = data.icon;
      const tempHtml = document.getElementById("temp");
      const tempIconUrl = document.getElementById("temp_icon");
      tempHtml.innerText = tempNum;
      tempIconUrl.src = tempIcon;
    });

  // $.ajax({
  //     type: "GET",
  //     url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
  //     data: {},
  //     success: function (response) {
  //         $('#temp').text(response['temp']);
  //         $('#temp_icon').attr("src",response['icon']);
  //     }
  // })

  //   if (name && comment) {
  //     $.ajax({
  //       type: "POST",
  //       url: "/homework",
  //       data: { name_give: name, comment_give: comment, date_give: date },
  //       success: function (response) {
  //         alert(response["msg"]);
  //         window.location.reload();
  //       },
  //     });
  //   } else {
  //     alert("내용을 입력하세요");
  //   }
}

function pagination(clicked_id) {
  let comment_num = (clicked_id - 1) * 5;
  show_comment(comment_num);
}

function show_comment(comment_num = 0) {
  fetch("/homework")
    .then((response) => response.json())
    .then((data) => {
      let pagination = document.getElementById("pagination");
      pagination.replaceChildren(); //페이지네이션 비우기 empty()
      let comment_list = document.getElementById("comment-list");
      comment_list.replaceChildren(); //댓글 비우기

      let rows = data.fans; //fans 받아서 저장
      let max_page = Math.ceil(rows.length / 5); //최대 페이지 계산 후 pagination 출력
      for (let i = 0; i < max_page; i++) {
        let page_num = i + 1;
        let temp_page = document.createElement("li");
        temp_page.innerHTML = `<li class="page-item"><a class="page-link" id="${page_num}" onclick="pagination(this.id)">${page_num}</a></li>`;
        pagination.append(temp_page);
      }

      // 페이지 네비 콘텐츠 출력
      for (let i = 0; i < 5; i++) {
        let start = rows.length - 1;
        let page_start = start - comment_num;
        let num = page_start - i;

        let name = rows[num]["name"];
        let comment = rows[num]["comment"];
        let date = rows[num]["date"];

        let temp_html = document.createElement("div");
        temp_html.innerHTML = `<div class="card">
                              <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                        <p>${comment}</p>
                                        <footer class="blockquote-footer">${name}</footer>
                                        <p class="time">${date}</p>
                                    </blockquote>
                                </div>
                            </div>`;
        comment_list.append(temp_html);
      }
    });

  // $.ajax({
  //   type: "GET",
  //   url: "/homework",
  //   data: {},
  //   success: function (response){
  // let rows = response["fans"]; //fans 받아서 저장

  // $("#pagination").empty();
  // //최대 페이지 계산 후 pagination 출력
  // let max_page = Math.ceil(rows.length / 5);
  // for (let i = 0; i < max_page; i++) {
  //   let page_num = i + 1;
  //   let temp_page = `<li class="page-item">
  //                                       <a class="page-link" id="${page_num}" onclick="pagination(this.id)">${page_num}</a>
  //                                   </li>`;
  // $("#pagination").append(temp_page);
  // }

  // $("#comment-list").empty();
  // // 페이지 네비 콘텐츠 출력
  // for (let i = 0; i < 5; i++) {
  //   let start = rows.length - 1;
  //   let page_start = start - comment_num;
  //   let num = page_start - i;

  //   let name = rows[num]["name"];
  //   let comment = rows[num]["comment"];
  //   let date = rows[num]["date"];

  //   let temp_html = `<div class="card">
  //                                       <div class="card-body">
  //                                           <blockquote class="blockquote mb-0">
  //                                               <p>${comment}</p>
  //                                               <footer class="blockquote-footer">${name}</footer>
  //                                               <p class="time">${date}</p>
  //                                           </blockquote>
  //                                       </div>
  //                                   </div>
  //                   `;
  //   $("#comment-list").append(temp_html);
  // }
}
window.onload = function () {
  const wrap = document.querySelector(".wrap");
  const slider = wrap.querySelector(".slider");
  const moveBtn = wrap.querySelector(".arrow");
  let lis = slider.childElementCount;

  let current_idx = 0;
  let translate = 0;
  moveBtn.addEventListener("click", move_slide);

  function move_slide(event) {
    const liWidth = slider.clientWidth;
    if (event.target.className === "next") {
      if (current_idx < lis - 1) {
        current_idx += 1;
        translate = -(liWidth * current_idx);
        slider.style.transform = `translate(${translate}px)`;
      } else {
        current_idx = 0;
        slider.style.transform = `translate(0px)`;
      }
    } else if (event.target.className === "prev") {
      if (current_idx > 0) {
        current_idx -= 1;
        translate = -(liWidth * current_idx);
        slider.style.transform = `translate(${translate}px)`;
      } else {
        current_idx = lis - 1;
        translate = -(liWidth * current_idx);
        slider.style.transform = `translate(${translate}px)`;
      }
    }
  }
};

//전체 콘텐츠 꺼꾸로 출력
// for (let i = rows.length - 1; i > -1; i--){
//
//     let name = rows[i]['name'];
//     let comment = rows[i]['comment'];
//     let date = rows[i]['date']
//
//     let temp_html = `<div class="card">
//                         <div class="card-body">
//                             <blockquote class="blockquote mb-0">
//                                 <p>${comment}</p>
//                                 <footer class="blockquote-footer">${name}</footer>
//                                 <p class="time">${date}</p>
//                             </blockquote>
//                         </div>
//                     </div>
//     `
//     $('#comment-list').append(temp_html)
// }
