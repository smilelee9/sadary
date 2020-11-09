import { createStore } from 'redux';

var rawInitState = {
  userId: "1000",
  mode: 'home',
  rooms: [
    {
      id: 1, writer: '태형', dep: '대전', dest: '우한', desc: '추가정보 없음',
      joinedUsers: ["3000", "2000"], maxNum: 4
    },
  ],
  maxId: 1,
  notices: [
    { id: 1, title: '중요공지', desc: '카택전 v0.1 런칭' }
  ]
};

var myRooms = [];
myRooms = rawInitState.rooms.filter(function (room) {
  if (room.userId === rawInitState.userId) {
    console.log("yes!");
    return true;
  }
  return false;
});

var initState = { ...rawInitState, myRooms };

function reducer(state = initState, action) {
  var newState, newMyRooms;
  if (action.type === 'create') {
    var currentMaxId = state.rooms.length;
    var newId = currentMaxId + 1;
    var room = { id: newId, writer: action.writer, dep: action.dep, dest: action.dest, desc: action.desc, joinedUsers: [state.userId], maxNum: action.maxNum };
    console.log(room);
    var newRooms = [...state.rooms, room];
    newMyRooms = [...state.myRooms, room]
    newState = { ...state, mode: 'home', rooms: newRooms, maxId: newId, myRooms: newMyRooms };
    return newState;
  }

  if (action.type === 'join') {
    var userId = state.userId;
    var room = state.rooms[action.roomId - 1];
    if (room.joinedUsers.length === room.maxNum) {
      alert("정원이 다 찼습니다.")
      return state;
    }
    for (var i = 0; i < room.joinedUsers.length; i++) {
      var currentUserId = room.joinedUsers[i];
      if (currentUserId === userId) {
        window.alert('이미 참여한 방입니다');
        return state;
      }
    }
    room.joinedUsers.push(userId);
    console.log("joined", room, userId, room.joinedUsers);

    newMyRooms = [...state.myRooms, room];
    newState = { ...state, myRooms: newMyRooms };
    return newState;
  }

  if (action.type === 'delete') {
    var newRooms = state.rooms.filter(function (room) {
      if (room.id === action.roomId) {
        return false;
      }
      return true;
    });

    var newMyRooms = state.myRooms.filter(function (myRoom) {
      if (myRoom.id === action.roomId) {
        return false;
      }
      return true;
    });

    newState = { ...state, rooms: newRooms, myRooms: newMyRooms };
    return newState;
  }

  if (action.type === 'quit') {
    var userId = state.userId;
    var newMyRooms = [];
    for (var i = 0; i < state.myRooms.length; i++) {
      var currentRoom = state.myRooms[i];
      var currentRoomId = currentRoom.id;
      if (currentRoomId !== action.roomId) {
        newMyRooms.push(currentRoom);
      }
    }
    var room = state.rooms[action.roomId - 1];

    var newJoinedUsers = room.joinedUsers.filter(function (user) {
      if (user === userId) {
        return false;
      }
      return true;
    })

    room.joinedUsers = newJoinedUsers;
    console.log("quit", room, userId, room.joinedUsers);


    newState = { ...state, myRooms: newMyRooms };
    newState.rooms.num = newState.rooms.num - 1
    return newState;
  }
  return state;
}

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
