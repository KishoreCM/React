import React, { Component } from "react";

class FriendName extends Component {
  render() {
    return (
      <div>
        <a href="www.splitwise.com" className="group_name">
          <i className="fa fa-user"></i> {this.props.current_grp_frnds}
        </a>
      </div>
    );
  }
}

class FriendTags extends Component {
  displayFriends = () => {
    let friendsName = [];
    for (let i = 0; i < this.props.grpFriends.length; i++) {
      friendsName.push(
        <FriendName
          key={i}
          current_grp_frnds={this.props.grpFriends[i]["friend_" + i]}
        />
      );
    }
    return friendsName;
  };

  render() {
    return <React.Fragment>{this.displayFriends()}</React.Fragment>;
  }
}

export default FriendTags;
