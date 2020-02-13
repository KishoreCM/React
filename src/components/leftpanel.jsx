import React, { Component } from "react";
import GroupTags from "./groupTags";
import FriendTags from "./friendtags";

class LeftPanel extends Component {
  displayGroups() {
    //let groups = JSON.parse(AddGroup.getGroups());
    let groupTags = [];
    if (this.props.group_data) {
      for (var i = 0; i < this.props.group_data.length; i++) {
        groupTags.push(
          <GroupTags
            key={i}
            id={i}
            groupTags={this.props.group_data[i].group_name}
            group_data={this.props.group_data[i]}
            handleClick={this.props.handleClick}
          />
        );
      }
    }

    return groupTags;
  }

  displayGrpFriends() {
    //let groups = JSON.parse(AddGroup.getGroups());
    let grpFriends = [];
    if (this.props.group_data) {
      for (var i = 0; i < this.props.group_data.length; i++) {
        grpFriends.push(
          <FriendTags
            key={i}
            id={i}
            grpFriends={this.props.group_data[i].friends_name}
          />
        );
      }
    }

    return grpFriends;
  }

  render() {
    return (
      <div id="leftpanel">
        <div id="view_options">
          <a /*href="www.splitwise.com"*/ id="dashboard_option">Dashboard</a>
          <div className="group_tags">
            <div className="header">
              GROUPS
              <a id="add_group" href="/addgroup">
                + Add
              </a>
            </div>

            {this.displayGroups()}
          </div>

          <div className="group_tags">
            <div className="header">FRIENDS</div>
            {this.displayGrpFriends()}
          </div>
        </div>
      </div>
    );
  }
}

export default LeftPanel;
