
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const showBtn = document.querySelector("#showBtn");
const moneyInput = document.querySelector("#moneyInput");

const balanceElement = document.querySelector("#balanceElement");
const tableList = document.querySelector("#resultList");
const contentElement = document.querySelector("#content");


window.onload = function() {
  const clientName = prompt("Zəhmət olmasa adınızı daxil edin:");
  if (clientName) {
    contentElement.innerHTML = `Salam, ${clientName}!  Şəxsi kabinetinizə xoş gəldiniz.`;
  } else {
    contentElement.innerHTML = "Adınızı daxil etməmisiniz. Xahiş edirik, səhifəni təkrar yükləyin və adınızı daxil edin.";
  }
};

const bankAccount = {
  balance: 0,
  limit: 1000,
  hesabat: [],
  date: new Date(),

  generateReferenceNumber: function (type) {
    const prefix = type === "Cash" ? "CS#" : "WD#";
    const referenceNumber = prefix + Math.floor(1000000000 + Math.random() * 1000000000);
    return referenceNumber;
  },

  cashIn: function (m) {
    if (this.balance >= this.limit || m <= 0 || !m) {
      console.log("Invalid");
      return;
    }

    this.balance += m;
    const history = {
      referenceNumber: this.generateReferenceNumber("Cash"),
      type: "Cash In",
      amount: m,
      totalAmount: this.balance,
      created: new Date(),
    };

    this.hesabat.push(history);

    return this.balance;
  },

  cashWithdraw: function (m) {
    const checkValid = () => {
      if (this.balance <= m) {
        alert("Pis fakir pulun yoxdu no money");
        return "";
      }
      this.balance -= m;

      const history = {
        referenceNumber: this.generateReferenceNumber("Withdraw"),
        type: "Withdraw",
        amount: m,
        totalAmount: this.balance, // Corrected: Use the current balance as the total amount after withdrawal
        created: new Date(),
      };

      this.hesabat.push(history);
    };

    checkValid();
    return this.balance;
  },

  showBalance: function () {
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
  bankAccount.updateTotalBalance();

  moneyInput.value = "";
});

decrementBtn.addEventListener("click", function () {
  const value = moneyInput.value;
  bankAccount.cashWithdraw(+value);
  bankAccount.updateTotalBalance();

  moneyInput.value = "";
});

showBtn.addEventListener("click", function () {
  const result = bankAccount.showBalance();
  balanceElement.innerHTML = result;

  const newContent = bankAccount.hesabat
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.referenceNumber}</td>
          <td>${item.type}</td>
          <td class="text-${item.type == "Cash In" ? "success" : "danger"}">${
            item.type == "Cash In" ? "+" + item.amount + " Azn" : "-" + item.amount + " Azn"
          }</td>
          <td>${item.totalAmount}  Azn</td>
          <td>${item.created.toLocaleString()}</td>
        </tr>
      `
    )
    .join("");

  tableList.innerHTML = newContent;
});

bankAccount.updateTotalBalance = function () {
  const totalBalance = this.hesabat.length > 0 ? this.hesabat[this.hesabat.length - 1].totalAmount : 0;
  balanceElement.innerHTML = totalBalance;
};

