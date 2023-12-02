const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const showBtn = document.querySelector("#showBtn");
const moneyInput = document.querySelector("#moneyInput");

const balanceElement = document.querySelector("#balanceElement");
const tableList = document.querySelector("#resultList");


const bankAccount = {
  balance: 0,
  limit: 1000,
  hesabat: [],
  date: new Date(),

//   cashIn: function (m) {
//     if (this.balance >= this.limit || m <= 0 || !m) {
//       console.log("Invalid");
//       return;
//     }

//     this.balance += m;

//     const history = {
//       type: "Cash",
//       amount: m,
//       created: this.date
//     };

//     this.hesabat.push(history);

//     return this.balance;
//   },

//   cashWithdraw: function (m) {
//     const checkValid = () => {
//       if (this.balance <= 0) {
//         console.log("invalid balance");
//         return "";
//       }
    
//       this.balance -= m;

//       const history = {
//         type: "Withdraw",
//         amount: m,
//         created: this.date,
//       };


//       this.hesabat.push(history);
//     };

    
//     checkValid();
//     return this.balance;
//   },

// ...

cashIn: function (m) {
    if (this.balance >= this.limit || m <= 0 || !m) {
      console.log("Invalid");
      return;
    }
  
    this.balance += m;
  
    const history = {
      type: "Cash",
      amount: m,
      created: new Date() // Use the current date
    };
  
    this.hesabat.push(history);
  
    return this.balance;
  },
  
  cashWithdraw: function (m) {
    const checkValid = () => {
      if (this.balance <= 0) {
        console.log("invalid balance");
        return "";
      }
  
      this.balance -= m;
  
      const history = {
        type: "Withdraw",
        amount: m,
        created: new Date() // Use the current date
      };
  
      this.hesabat.push(history);
    };
  
    checkValid();
    return this.balance;
  },
    

  showBalance: function (m) {
    const thisObj = this;
    function handleMonitor() {
      console.log(thisObj.balance);
      console.log(thisObj.hesabat);
    }
    handleMonitor();
    return this.balance;
  },
};
incrementBtn.addEventListener("click", function () {
  const value = moneyInput.value;

  bankAccount.cashIn(+value);

  moneyInput.value = "";
});

decrementBtn.addEventListener("click", function () {
   
  const value = moneyInput.value;
  bankAccount.cashWithdraw(+value);
  moneyInput.value = "";
});


showBtn.addEventListener("click", function () {
    const result = bankAccount.showBalance();
  
    balanceElement.innerHTML = result;
  
    const newContent = bankAccount.hesabat
      .map(
        (item, index) => `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${item.type}</td>
    <td class="text-${item.type == "Cash" ? "success" : "danger"}">${
          item.type == "Cash" ? "+" + item.amount + " " + "Azn" : "-" + item.amount + " " + "Azn"
        }</td>
    <td>${item.created.toLocaleString()}</td> <!-- Display date and time -->
  </tr>
    `
      )
      .join("");
  
    tableList.innerHTML = newContent;
  });
  
  
  