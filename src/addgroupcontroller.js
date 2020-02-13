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
    let currentGrpName = sessionStorage.getItem("current_grp_switch");
    if (currentGrpName) {
      let grp = groupsData.filter(g => g.group_name === currentGrpName);
      return grp[0];
    }

    return groupsData[1];
  }

  setCurrentGrpSwitch(group_name) {
    sessionStorage.setItem("current_grp_switch", group_name);
  }
}

export default new AddGroup();
