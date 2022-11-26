let botAvatar = 1;
const avatarArray = [1, 2];
function ani() {
  let botAvatar = avatarArray[Math.floor(Math.random() * avatarArray.length)];
  console.log(botAvatar);
}
ani();
