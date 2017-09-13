(function (){

    let addressBook = [];
    let search=document.getElementById("searchInput");
    search.placeholder=counts();
    //for edit
    let change=-1;
    //for del input
    let countNumber=2;
    let countEmail=2;

    // let delInput=document.getElementsByClassName("fa fa-minus");

    //buttons
    let delBtn=document.getElementById("delBtn");
    let quickAddBtn=document.getElementById("quickAddBtn");
    let AddBtn=document.getElementById("Add");
    let cancelBtn=document.getElementById("Cancel");
    let newNumber = document.getElementsByClassName('newNumber');
    let newEmail = document.getElementsByClassName('newEmail');

    // let numbersBlock=document.getElementById('numbers-block');
    let plusNumber = document.getElementById('plus-number');

    let plusEmail = document.getElementById('plus-email');



    let searchDiv=document.querySelector(".searchDiv");
    let toTrash=document.querySelector(".toTrash");

    let quickAddFormDiv=document.querySelector(".quickaddForm");

    let name = document.getElementById("name");
    let lastname = document.getElementById("lastname");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");

    let addBookDiv =document.querySelector(".addbook");

    let numbers_new = document.getElementsByClassName('number-new');
    let emails_new = document.getElementsByClassName('email-new');

    //delInput.addEventListener("click",removeInput);
    search.addEventListener("keyup", searchF);
    AddBtn.addEventListener("click", addToBook);
    delBtn.addEventListener("click", remove);
    addBookDiv.addEventListener("click", onEditPressed);
    plusNumber.addEventListener('click', addNumber);
    plusEmail.addEventListener('click', addEmail);

    quickAddBtn.addEventListener("click", function () {

        if (quickAddFormDiv.style.display==="none"){
            quickAddFormDiv.style.display="block";
            searchDiv.style.display="none";
            addBookDiv.style.display="none";
            quickAddBtn.style.display="none";
            toTrash.style.display="none";

            clearForm();

        }else {
            quickAddFormDiv.style.display="block";
            searchDiv.style.display="none";
            addBookDiv.style.display="none";
            quickAddBtn.style.display="none";
            toTrash.style.display="none";

        }
    });

    cancelBtn.addEventListener("click",function () {
        clearForm();
        toTrash.style.display="none";
        quickAddFormDiv.style.display="none";
        addBookDiv.style.display="block";
        searchDiv.style.display="block";
        quickAddBtn.style.display="block";
        showAddressBook();
    });


    function addNumber() {

            div=document.createElement("div");
            div.className="newNumber";
            div.dataset.id=countNumber;
            phone.parentNode.insertBefore(div, null);

            input=document.createElement('input');
            input.type = 'tel';
            input.className="number-new";
            input.placeholder="Phone";
            // input.dataset.id=count;
            // div.parentNode.insertBefore(input, null);
            div.appendChild(input);


            span=document.createElement('span');
            span.className="minus";
            // span.dataset.id=count;
            // span.addEventListener("click",removeNumber);
            // div.parentNode.insertBefore(span, null);
            div.appendChild(span);

            i=document.createElement('i');
            i.className="fa fa-minus";
            i.dataset.id=countNumber;
            i.addEventListener("click",removeNumber);
            // span.parentNode.insertBefore(i, null);
            span.appendChild(i);
            countNumber++;

            //equal appendchild
            //сразу вызывает функцию O_0
            // i.onclick=removeInput();

    }

    function addEmail() {

        div=document.createElement("div");
        div.className="newEmail";
        div.dataset.id=countEmail;
        email.parentNode.insertBefore(div, null);

        input=document.createElement('input');
        input.type = 'email';
        input.className="email-new";
        input.placeholder="Email";

        div.appendChild(input);


        span=document.createElement('span');
        span.className="minus";

        div.appendChild(span);

        i=document.createElement('i');
        i.className="fa fa-minus";
        i.dataset.id=countEmail;
        i.addEventListener("click",removeEmail);
        // span.parentNode.insertBefore(i, null);
        span.appendChild(i);
        countEmail++;

        //equal appendchild
        //сразу вызывает функцию O_0
        // i.onclick=removeInput();

    }
    // function addEmail () {
    //         input=document.createElement('input');
    //         input.type = 'email';
    //         input.className="email-new";
    //         input.placeholder="Email";
    //         //equal appendchild
    //         email.parentNode.insertBefore(input, null);
    // }






    //remove input from DOM for next contact add(add form to custom)
    function deleteNumberFromDom() {
        for (let i=numbers_new.length-1; i>0; i--){
            numbers_new[i].parentNode.removeChild(numbers_new[i]);
        }
        for (let i = 0; i < newNumber.length; i++){
                newNumber[i].parentNode.removeChild(newNumber[i]);
        }


    }
    function deleteEmailFromDom() {
        for (let i=emails_new.length-1; i>0; i--){
            emails_new[i].parentNode.removeChild(emails_new[i]);
        }
        for (let i = 0; i < newEmail.length; i++){
            newEmail[i].parentNode.removeChild(newEmail[i]);
        }
    }

    function searchF() {

        addressBook = JSON.parse(localStorage['addbook']);
        let searchitem=search.value.toLowerCase();

        addBookDiv.innerHTML = '';
        for(let n=0; n<addressBook.length; n++){
            //if(JSON.stringify(addressBook[n]).toLowerCase().indexOf(searchitem)>-1) {
            if(addressBook[n].name.toLowerCase().indexOf(searchitem)>-1
                || addressBook[n].lastname.toLowerCase().indexOf(searchitem)>-1
                // || addressBook[n].phone[0].toLowerCase().indexOf(searchitem)>-1
                || showPhones(n).indexOf(searchitem)>-1
                // || addressBook[n].email[0].toLowerCase().indexOf(searchitem)>-1){
                || showEmails(n).toLowerCase().indexOf(searchitem)>-1){
                let str = '<div class="entry clearfix" data-id="' + n + '">';
                str += '<div class="name" data-id="' + n + '"><p>'
                    +"Name : "+ addressBook[n].name +" "+ addressBook[n].lastname +'<br></p>'
                    +"Phones : "+showPhones(n)+'<br>'
                    +"Emails : "+showEmails(n)+'</div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }



    function counts() {
        if (localStorage['addbook']){
            addressBook = JSON.parse(localStorage['addbook']);
            return " Contacts : "+addressBook.length;
        }else{

            return " Contacts : 0";
        }
    }


    // function JsonStructure(name,lastname, phone,email){
    //     this.name=name;
    //     this.lastname=lastname;
    //     this.phone=phone;
    //     this.email=email;
    //
    // }


    function validation() {
        let phonePattern = /^(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        let emailPattern =/.+@.+\..+/i;
        let count=true;
        for (let i=0; i<numbers_new.length; i++){
            if (!phonePattern.exec(numbers_new[i].value)){
                numbers_new[i].style.backgroundColor = "#b30000";
                setTimeout(function() {clearStyle()},700);
                count=false;

            }
        }

        for (let i=0; i<emails_new.length; i++) {
            if (!emailPattern.exec(emails_new[i].value)) {
                emails_new[i].style.backgroundColor = "#b30000";
                setTimeout(function () {clearStyle()}, 700);
                count = false;
            }
        }

        return count;
    }

// function validatePhone() {
//         let phonePattern = /^(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
//         let count=0;
//         for (let i=0; i<numbers_new.length; i++){
//             if (!phonePattern.exec(numbers_new[i].value)){
//                 numbers_new[i].style.backgroundColor = "#b30000";
//                 setTimeout(function() {clearStyle()},700);
//                 count+=1;
//
//             }else {
//                 // numbers_new[i].style.backgroundColor = "white";
//                 /// -0 работает как -1, -1 работает как -2 бред!!
//                 count-=0;
//             }
//         }
//
//     return count;
// }
function clearStyle() {
    for (let i=0; i<numbers_new.length; i++){
        if (numbers_new[i].style.backgroundColor !== "white"){
            numbers_new[i].style.backgroundColor = "white";
        }
    }
    for (let i=0; i<emails_new.length; i++){
        if (emails_new[i].style.backgroundColor !== "white"){
            emails_new[i].style.backgroundColor = "white";
        }
    }


}

// function validateEmail() {
//         let emailPattern =/.+@.+\..+/i;
//         let count=0;
//         for (let i=0; i<emails_new.length; i++){
//             if (!emailPattern.exec(emails_new[i].value)){
//                 emails_new[i].style.backgroundColor = "red";
//                 count+=1;
//
//             }else {
//                 emails_new[i].style.backgroundColor = "white";
//                 /// -0 работает как -1, -1 работает как -2 бред!!
//                 count-=0;
//             }
//         }
//         return count;
// }

function  addToBook() {

        let contact = {
            name:name.value,
            lastname:lastname.value,
            phone:[],
            email:[]
        };

    // if (validatePhone()===0 && validateEmail()===0){
        if (validation()){
        for (let i=0; i<numbers_new.length; i++){
            contact.phone.push(numbers_new[i].value);

        }
        for (let i=0; i<emails_new.length; i++){
            contact.email.push(emails_new[i].value);
        }

        let isNull = name.value!='' && lastname.value!='';
        if (isNull){

            if (change===-1){
                addressBook.push(contact);

            }else{
                addressBook.splice(change, 1,contact);
            }
        localStorage['addbook']=JSON.stringify(addressBook);
        quickAddFormDiv.style.display = "none";
        searchDiv.style.display="block";
        addBookDiv.style.display="block";
        quickAddBtn.style.display="block";
        toTrash.style.display="none";
        clearForm();
        search.placeholder=counts();
        showAddressBook();
        }
    // for (let i=0; i<numbers_new.length; i++){
    //     contact.phone.push(numbers_new[i].value);
    //
    // }
    // for (let i=0; i<emails_new.length; i++){
    //         contact.email.push(emails_new[i].value);
    // }
    //     let isNull = name.value!='' && lastname.value!='' &&  email.value!=''&&phone.value!='';
    // if (isNull){
    //
    //     if (change===-1){
    //         addressBook.push(contact);
    //
    //     }else{
    //         addressBook.splice(change, 1,contact);
    //     }
    //
    //     localStorage['addbook']=JSON.stringify(addressBook);
    //     quickAddFormDiv.style.display = "none";
    //     searchDiv.style.display="block";
    //     addBookDiv.style.display="block";
    //     quickAddBtn.style.display="block";
    //     toTrash.style.display="none";
    //     clearForm();
    //     search.placeholder=counts();
    //     showAddressBook();
    }

}
    //==============


    // function addToBook2() {
    //     let isNull = name.value!='' && lastname.value!='' &&  email.value!=''&&phone.value!='';
    //
    //     let phonePattern = /^(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    //     let emailPattern = /.+@.+\..+/i;
    //     let phoneOK = phonePattern.exec(phone.value);
    //     let emailOK = emailPattern.exec(email.value);
    //
    //     phone.style.backgroundColor="white";
    //     email.style.backgroundColor="white";
    //     if(!phoneOK){
    //         setTimeout(phone.style.backgroundColor = "red" ,50000000000000);
    //
    //     }else if (!emailOK){
    //         setTimeout(email.style.backgroundColor = "red" ,50000000000000);
    //     }else{
    //
    //         if(isNull){
    //
    //             // format the input into a valid JSON structure
    //             let obj = new JsonStructure(name.value,lastname.value,phone.value,email.value);
    //             //add obj
    //             if(change===-1){
    //                 addressBook.push(obj);
    //                 //change obj
    //             }else{
    //                 addressBook.splice(change, 1,obj);
    //             }
    //
    //             localStorage['addbook'] = JSON.stringify(addressBook);
    //             quickAddFormDiv.style.display = "none";
    //             searchDiv.style.display="block";
    //             addBookDiv.style.display="block";
    //             toTrash.style.display="none";
    //             clearForm();
    //
    //             search.placeholder=counts();
    //             showAddressBook();
    //     }   }
    //
    //
    // }
function clearForm(){
        change=-1;
        let formFields=document.querySelectorAll(".formFields");
        let numberFields=document.querySelectorAll(".number-new");
        let emailFields=document.querySelectorAll(".email-new");
        document.getElementById("Add").innerHTML="Ok";
        search.value="";

        for (let param in formFields){

            formFields[param].value="";
        }
        for (let param in numberFields){

            numberFields[param].value="";
        }
        for (let param in emailFields){

            emailFields[param].value="";
        }
        deleteNumberFromDom();
        deleteEmailFromDom();
        countNumber=2;
        countEmail=2;

}


function showPhones(index) {
        let str='';
        for (let i=0; i<addressBook[index].phone.length; i++){
            str+=addressBook[index].phone[i]+" ";
        }
         return str;
};

function showEmails(index) {
        let str='';
        for (let i=0; i<addressBook[index].email.length; i++){
            str+=addressBook[index].email[i]+" ";
        }
        return str;
};

function showAddressBook(){
        if(localStorage['addbook'] === undefined){
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);

            function compareObjects (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                if (a.name === b.name) return 0;

            };
            addressBook.sort(compareObjects);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for(let n=0; n<addressBook.length; n++){
                let str = '<div class="entry clearfix" data-id="' + n + '">';
                str += '<div class="name" data-id="' + n + '"><p>'
                    +"Name : "+ addressBook[n].name +" "+ addressBook[n].lastname +'<br></p>'
                    +"Phones : "+showPhones(n)+'<br>'
                    +"Emails : "+showEmails(n)+'</div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
}
function remove () {
        let removeId = change;
        if (removeId !== -1) {
            addressBook.splice(removeId, 1);
            window.localStorage.setItem("addbook", (JSON.stringify(addressBook)));
            clearForm();
            searchDiv.style.display = "block";
            addBookDiv.style.display = "block";
            toTrash.style.display = "none";
            quickAddFormDiv.style.display = "none";
            quickAddBtn.style.display="block";
            search.placeholder = counts();
            deleteNumberFromDom();
            deleteEmailFromDom();
            showAddressBook();
        }
}

function removeNumber(e) {
console.log("+number");
console.log(e.target.getAttribute("data-id"));
    let removeId=e.target.getAttribute("data-id");

    for (let i = 0; i < newNumber.length; i++){

        if (newNumber[i].dataset.id === removeId){
            newNumber[i].parentNode.removeChild(newNumber[i]);
            countNumber-=1;
        }
    }
    // for (let i = 0; i < delInput.length; i++){
    //
    //     if (delInput[i].id == removeId){
    //         delInput[i].parentNode.removeChild(delInput[i]);
    //     }
    // }
}
    function removeEmail(e) {
        console.log("+email");
        console.log(e.target.getAttribute("data-id"));
        let removeId=e.target.getAttribute("data-id");

        for (let i = 0; i < newEmail.length; i++){

            if (newEmail[i].dataset.id === removeId){
                newEmail[i].parentNode.removeChild(newEmail[i]);
                countEmail-=1;
            }
        }
        // for (let i = 0; i < delInput.length; i++){
        //
        //     if (delInput[i].id == removeId){
        //         delInput[i].parentNode.removeChild(delInput[i]);
        //     }
        // }
    }
function onEditPressed(e){
        if (e.target.classList.contains("name")) {
            searchDiv.style.display="none";
            addBookDiv.style.display="none";
            toTrash.style.display="block";
            quickAddFormDiv.style.display = "block";
            quickAddBtn.style.display="none";

            let editId = e.target.getAttribute("data-id");
            let item=addressBook[editId];

            change=editId;
            document.getElementById("name").value=item.name;
            document.getElementById("lastname").value=item.lastname;
            deleteNumberFromDom();
            deleteEmailFromDom();
            if (item.phone.length>0){
                for (let i=0; i<item.phone.length; i++){
                    if (i>0)
                    {
                        addNumber();
                        numbers_new[i].value=item.phone[i];
                        // console.log(item.phone[i]);
                    }
                    numbers_new[i].value=item.phone[i];
                }
            }
            if (item.email.length>0){

                for (let i=0; i<item.email.length; i++){
                    if (i>0)
                    {
                        addEmail();
                        emails_new[i].value=item.email[i];
                    }
                    emails_new[i].value=item.email[i];
                }
            }
            document.getElementById("Add").innerHTML="Update";
        }
}

showAddressBook();
})();

