function search() {
    let filter = document.getElementById('search').value.toUpperCase();
    let tab = document.getElementById('tab');
    let tr = tab.getElementsByTagName('tr');

    for(var i=0; i < tr.length; ++i){
      let td = tr[i].getElementsByTagName('td')[0];
      if(td){
        let textvalue = td.textContent || td.innerHTML;

        if(textvalue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        }else{
          tr[i].style.display = "none";
        }
      }
    }
  } 


  const openPopupButton = document.querySelectorAll('[data-target]');
  const closePopupButton = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openPopupButton.forEach(button => {
      button.addEventListener('click', () => {
          const popup = document.querySelector(button.dataset.target);
          openPopup(popup);
      });
  });


  closePopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

overlay.addEventListener('click', () => {
  const popup = document.querySelectorAll('.popup.active')
  popup.forEach(popup => {
    closePopup(popup)
  })
})

function openPopup(popup) {
    if (popup == null) return;
    popup.classList.add('active');
    overlay.classList.add('active');
}

  function closePopup(popup) {
    if (popup == null) return;
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

//-------VAlidation--------------
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


function absent(e) {
  const idx = e.id;
  var x = document.getElementById(idx);
  var p = document.getElementById('present-'+ idx);
  console.log(x)
  var y = window.confirm('Do You want to mark this student Absent?');
  const currLoc = window.location.href;
  if( y )
  {
    x.checked= true;
    $.post(currLoc+`/delete/${idx}`,{},
 function(data, status){
   window.location.reload();
 });
    
  }
  else
  {
    p.checked= true;
  }
}


// const download = document.getElementById("download");
//   download.addEventListener("click", ()=> {
//     const attendance = this.document.getElementsByClassName("attendance");
//     console.log(attendance);
//     html2pdf().from(attendance).save();
//   })
// function convert() {
  
//   //-html2pdf().from(attendance).save();
//   var element = document.getElementById('AttendanceMeetData');
//   var opt = {
//     margin:       1,
//     filename:     'myfile.pdf',
//     image:        { type: 'jpeg', quality: 0.98 },
//     html2canvas:  { scale: 2 },
//     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };
//   html2pdf(element, opt);

// }

// function convert() {

//   // var dis = document.getElementById('sidebar');
//   // if(dis.style.display === "none")
//   // {
//   //   dis.style.display= "block";
//   //   console.log(dis.style.display);
//   // }
//   // printPdf();

//   function printPdf(){
//     var element = document.getElementById('AttendanceMeetData');
//   // var element1 = document.getElementById('AttendanceMeetData1');
//   // var element = document.getElementsByClassName('attendance');
//   var linkUrl = document.getElementById('link-url');
//   var link = linkUrl.innerHTML.split(".com/").pop();

//   var opt = {
//     margin:       0,
//     filename:     `${link}`,
//     image:        { type: 'jpeg', quality: 0.98 },
//     html2canvas:  { scale: 2 },
//     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };
//   // console.log(`${x}`);
//   html2pdf(element, opt);
//   }
//   // var dis = document.getElementById('sidebar');
//   // var sidebar = document.getElementById('sidebar');
//   //-html2pdf().from(attendance).save();
//   // displayDiv();
 
//   // function displayDiv() {
//   //   var dis = document.getElementById('sidebar');
//   //   if(dis.style.display === "none")
//   //   {
//   //     dis.style.display= "block";
//   //     console.log(dis.style.display);
//   //   }
//   // }
//   // dis.style.display= "none"
//   // dis.style.display= "none";
// }


function convert(){
  var element1 = document.getElementById('meetDetails')
  var element2 = document.getElementById('tab')
// var element1 = document.getElementById('AttendanceMeetData1');
// var element = document.getElementsByClassName('attendance');
var linkUrl = document.getElementById('link-url');
var linkdate = document.getElementById('link-date');
var linktaker = document.getElementById('link-taker');
var taker = linktaker.innerHTML;
var date = linkdate.innerHTML;
var link = linkUrl.innerHTML.split(".com/").pop();

var opt = {
  margin:       0.5,
  filename:     `${taker}_${link}_${date}`,
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
// console.log(`${x}`);
html2pdf().from(element1).set(opt).toPdf().get('pdf').then(function (pdf) {
  pdf.addPage();
}).from(element2).toContainer().toCanvas().toPdf().save();
}
