let cellsPlayer = document.getElementsByClassName("cell-player");

//console.log(cellsPlayer[cellIndex]);

let board = [[], [], [], [], [], [], [], [], [], []];
let cellIndex = 0;

let ship4_1 = {
    id: "4_1",
    size: 4
};

let ship3_1 = {
    id: "3_1",
    size: 3
};

let ship3_2 = {
    id: "3_2",
    size: 3
};

let ship2_1 = {
    id: "2_1",
    size: 2
};

let ship2_2 = {
    id: "2_2",
    size: 2
};

let ship2_3 = {
    id: "2_3",
    size: 2
};

let ship1_1 = {
    id: "1_1",
    size: 1
};

let ship1_2 = {
    id: "1_2",
    size: 1
};

let ship1_3 = {
    id: "1_3",
    size: 1
};

let ship1_4 = {
    id: "1_4",
    size: 1
};

let ships = [ship4_1, ship3_1, ship3_2, ship2_1, ship2_2, ship2_3, ship1_1, ship1_2, ship1_3, ship1_4];

let canPut;

for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
        board[i][k] = cellsPlayer[cellIndex];
        cellIndex++;
    }
}

let shipIndex = 0;
let shipZone = [];
let deadZone = [];

// горизонтальное отображение
for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
        board[i][k].onmouseover = () => { // ПРИ НАВЕДЕНИИ МЫШИ (направление или вправо или вниз)


            // если выходит за границы
            if (shipIndex == ships.length || k + ships[shipIndex].size - 1 >= board.length) {
                canPut = false;
                return;
            }

            // если отрисовка заходит на корабль или мертвую зону
            for (let j = 0; j < ships[shipIndex].size; j++) {
                shipZone[j] = board[i][k + j];

                // заходит на корабль
                if (shipZone[j].classList.contains("ship") || shipZone[j].classList.contains("dead-zone-fix")) {
                    canPut = false;
                    return;
                }
            }

            // отрисовка зоны для корабля
            for (let j = 0; j < ships[shipIndex].size; j++) {
                shipZone[j] = board[i][k + j];
                shipZone[j].classList.add("ship-zone");

                if (i > 0) {
                    // верхняя линия
                    deadZone.push(board[i - 1][k + j]);
                    //board[i - 1][k + j].classList.add("dead-zone");

                    // если слева есть место
                    if (k > 0) {
                        // верхняя слева
                        if (!deadZone.includes(board[i - 1][k - 1]))
                            deadZone.push(board[i - 1][k - 1]);
                        //board[i - 1][k - 1].classList.add("dead-zone");

                        // центральная слева
                        if (!deadZone.includes(board[i][k - 1]))
                            deadZone.push(board[i][k - 1]);
                        //board[i][k - 1].classList.add("dead-zone");
                    }




                    // если справа есть место
                    if (k + ships[shipIndex].size < board.length) {
                        // верхняя справа
                        if (!deadZone.includes(board[i - 1][k + ships[shipIndex].size]))
                            deadZone.push(board[i - 1][k + ships[shipIndex].size]);
                        //board[i - 1][k + ships[shipIndex].size].classList.add("dead-zone");

                        // центральная справа
                        if (!deadZone.includes(board[i][k + ships[shipIndex].size]))
                            deadZone.push(board[i][k + ships[shipIndex].size]);
                        //board[i][k + ships[shipIndex].size].classList.add("dead-zone");
                    }
                }

                if (k > 0) {

                    // центральная слева
                    if (!deadZone.includes(board[i][k - 1]))
                        deadZone.push(board[i][k - 1]);
                    //board[i][k - 1].classList.add("dead-zone");
                }


                // если справа есть место
                if (k + ships[shipIndex].size < board.length) {

                    // центральная справа
                    if (!deadZone.includes(board[i][k + ships[shipIndex].size]))
                        deadZone.push(board[i][k + ships[shipIndex].size]);
                    //board[i][k + ships[shipIndex].size].classList.add("dead-zone");
                }

                if (i < 9) {
                    // нижняя линия
                    deadZone.push(board[i + 1][k + j]);
                    //board[i + 1][k + j].classList.add("dead-zone");

                    if (k > 0) {
                        // нижняя слева
                        if (!deadZone.includes(board[i + 1][k - 1]))
                            deadZone.push(board[i + 1][k - 1]);
                        //board[i + 1][k - 1].classList.add("dead-zone");
                    }

                    if (k + ships[shipIndex].size < board.length) {
                        // верхняя справа
                        if (!deadZone.includes(board[i + 1][k + ships[shipIndex].size]))
                            deadZone.push(board[i + 1][k + ships[shipIndex].size]);

                    }
                }

                //console.log(k + ships[shipIndex].size);


                ///shipZone[j].classList.add("ship-zone");


                canPut = true;
            }

            for (let g = 0; g < deadZone.length; g++) {
                deadZone[g].classList.add("dead-zone");
            }


        }

        // МЫШЬ УБРАНА С КЛЕТКИ
        board[i][k].onmouseout = () => {
            if (shipIndex == ships.length || !canPut)
                return;

            for (let g = 0; g < deadZone.length; g++) {
                deadZone[g].classList.remove("dead-zone");
            }
            deadZone.splice(0, deadZone.length);


            for (let j = 0; j < shipZone.length; j++) {

                //очищается место для корабля
                shipZone[j].classList.remove("ship-zone");

            }

        }

        board[i][k].onclick = () => { // ПОСТАВИТЬ КОРАБЛЬ

            if (shipIndex == ships.length || !canPut)
                return;

            for (let j = 0; j < shipZone.length; j++) {
                //shipZone[j] = board[i][k+j];
                shipZone[j].classList.add("ship");
                putEnemyShip();
            }

            for (let j = 0; j < deadZone.length; j++) {
                //shipZone[j] = board[i][k+j];
                deadZone[j].classList.remove("dead-zone");
                deadZone[j].classList.add("dead-zone-fix");
            }

            shipIndex++;

            // если уже поставлены все корабли
            if (shipIndex == ships.length) {
                //canPut = false;

                Dead();
                


            }
        }

    }
}

function Dead() {
    let dead = cellsPlayer;
    for (let v = 0; v < dead.length; v++) {
        if (dead[v].classList.contains("dead-zone-fix"))
            dead[v].classList.remove("dead-zone-fix");
    }
}
