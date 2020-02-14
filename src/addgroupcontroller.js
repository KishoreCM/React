class AddGroup {
  createGroup(group, callback) {
    let anyGroup = localStorage.getItem("Groups");
    if (anyGroup) {
      anyGroup = JSON.parse(anyGroup);
      anyGroup.push(group);
    } else {
      anyGroup = [];
      anyGroup.push(group);
    }
    localStorage.setItem("Groups", JSON.stringify(anyGroup));
    sessionStorage.setItem("current_grp_switch", group.group_name);
    callback();
  }

  getGroups() {
    return localStorage.getItem("Groups");
  }

  setAddExpense(updated_data, callback) {
    let currentData = JSON.parse(this.getGroups());

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].group_name === updated_data.group_name) {
        currentData[i].friends_name = updated_data.friends_name;
        currentData[i].owed = updated_data.owed;
        currentData[i].expenses = updated_data.expenses;
        localStorage.setItem("Groups", JSON.stringify(currentData));
      }
    }
    callback();
  }

  getCurrentGrpSwitch() {
    let groupsData = JSON.parse(localStorage.getItem("Groups"));
    if (groupsData === null) return false;
    let currentGrpName = sessionStorage.getItem("current_grp_switch");
    if (currentGrpName) {
      let grp = groupsData.filter(g => g.group_name === currentGrpName);
      return grp[0];
    }
    return groupsData[0];
  }

  setCurrentGrpSwitch(group_name) {
    sessionStorage.setItem("current_grp_switch", group_name);
  }

  deleteGrpExpense(
    totalOwed,
    grpFriends,
    currentExpense,
    grpExpense,
    id,
    callback
  ) {
    let grps = JSON.parse(localStorage.getItem("Groups"));
    let uptExpLen = 0;

    for (let i = 0; i < grps.length; i++) {
      if (grps[i].group_name === grpExpense.group_name) {
        grps[i].owed = totalOwed;
        grps[i].friends_name = grpFriends;
        let updatedExpenses = grpExpense.expenses.filter(
          (expense, index) =>
            expense["expense_" + index] !== currentExpense["expense_" + id]
        );

        uptExpLen = updatedExpenses.length;
        let refineUpdatedExpense = [];
        let idxI = 0;
        let idxJ = 0;
        let exp = {};
        while (idxI < uptExpLen) {
          if (updatedExpenses[idxI]["expense_" + idxJ] !== undefined) {
            exp["expense_" + idxI] = updatedExpenses[idxI]["expense_" + idxJ];
            exp["youPaid_" + idxI] = updatedExpenses[idxI]["youPaid_" + idxJ];
            exp["youLent_" + idxI] = updatedExpenses[idxI]["youLent_" + idxJ];
            exp["onMonth"] = updatedExpenses[idxI]["onMonth"];
            exp["onDate"] = updatedExpenses[idxI]["onDate"];
            idxI++;
            refineUpdatedExpense.push(exp);
            exp = {};
          }
          idxJ++;
        }

        grps[i].expenses = refineUpdatedExpense;
        break;
      }
    }
    localStorage.setItem("Groups", JSON.stringify(grps));
    callback();
  }
}

export default new AddGroup();
