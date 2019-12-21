let cellsPlayer = document.getElementsByClassName("cell-player");

//console.log(cellsPlayer[cellIndex]);

let board = [ [], [], [], [], [], [], [], [], [], [] ];
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


//ships.forEach(s => console.log(s.id));

//console.log(ships[2].size);
//console.log(ship.size);



//console.log(cellsPlayer[cellIndex]);

for (let i = 0; i < 10; i++)
{
    for (let k = 0; k < 10; k++)
    {
        board[i][k] = cellsPlayer[cellIndex];
        cellIndex++;       
    }
}

let shipIndex = 0;
let shipZone = [];
// горизонтальное отображение
for (let i = 0; i < 10; i++)
{
    for (let k = 0; k < 10; k++)
    {
        board[i][k].onmouseover = () => { // ПРИ НАВЕДЕНИИ МЫШИ (направление или вправо или вниз)
            
            if (shipIndex == ships.length)
                return;
            
            if (k + ships[shipIndex].size - 1 >= board.length)
                return;
            
             
            
            for (let j = 0; j < ships[shipIndex].size; j++){
                shipZone[j] = board[i][k+j];
                shipZone[j].classList.add("ship-zone"); 
            }
            //console.log(shipZone);
            //board[i][k].classList.add("ship-zone"); 
            
            
            
        }
        
        board[i][k].onmouseout = () => {
             if (shipIndex == ships.length)
                return;
            for (let j = 0; j < shipZone.length; j++){
                //shipZone[j] = board[i][k+j];
                shipZone[j].classList.remove("ship-zone"); 
            }
            
            //board[i][k].classList.remove("ship-zone");
        }
        
        board[i][k].onclick = () => {
            if (shipIndex == ships.length)
                return;
            
            for (let j = 0; j < shipZone.length; j++){
                //shipZone[j] = board[i][k+j];
                shipZone[j].classList.add("ship"); 
            } 
            //if (shipIndex < ships.length)
                shipIndex++;
        }
    } 
}
