let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let userEntries = retrieveEntries();
const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td>${entry.w}</td>`;
      const emailCell = `<td>${entry.x}</td>`;
      const passwordCell = `<td>${entry.y}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const acceptTermsCell = `<td>${entry.z}</td>`;
      const row = `<tr>
          ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}
        </tr>`;
      return row;
    })
    .join("\n");
  const table = `<table class="table-auto w-full"><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>dob</th>
    <th>accepted terms?</th>
    </tr>${tableEntries}</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};
const saveUserForm = (event) => {
  event.preventDefault();
  const w = document.getElementById("name").value;
  const x = document.getElementById("email").value;
  const y = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const z = document.getElementById("acceptTerms").checked;
  const entry = {
    w,
    x,
    y,
    dob,
    z,
  };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
console.log(document.getElementById("name").value);
displayEntries();

const today = new Date();
const min = new Date(
  today.getFullYear() - 55,
  today.getMonth(),
  today.getDate()
);
const max = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
dob.setAttribute("min", min.toISOString().slice(0, 10));
dob.setAttribute("max", max.toISOString().slice(0, 10));
dob.addEventListener("change", () => {
  const age = Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e10);
  if (age < 18 || age > 55) {
    dob.setCustomValidity("Please enter age between 18 & 55");
  } else {
    dob.setCustomValidity("");
  }
});
