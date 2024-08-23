
var scoreCoin=0
var storedMoney = localStorage.getItem('money');
if (storedMoney !== null) {
    scoreCoin = parseInt(storedMoney); // Chuyển đổi thành số nguyên
} else {
    // Nếu không có dữ liệu trong Local Storage, sử dụng giá trị mặc định
    scoreCoin = 0; // Đặt một giá trị mặc định
    localStorage.setItem('money', scoreCoin); // Lưu giá trị mặc định vào Local Storage
}
//localStorage.setItem('money', 90000);
let config = {
    type: Phaser.AUTO,
    height:window.innerHeight+20,
    width:window.innerWidth,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#87CEEB',
    render: {
        pixelArt: false
    },
    physics:{
        default:"arcade",
        arcade:{
            gravity: { y: 1200 },
            debug:false
        }
    },
    scene: [Menu,Password,Verify , Social,Bullying]//,
}

let game = new Phaser.Game(config);




