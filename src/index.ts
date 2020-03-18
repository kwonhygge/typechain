//crypto-js 설치하기
//yarn add crypto-js
import * as CryptoJS from "crypto-js";

class Block{
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    //static method -> block안에 있고 클래스를 만들지 않아도 호출할 수 있는 것
    static calculateBlockHash = (
        index:number,
        previousHash:string,
        timestamp:number,
        data: string
        ): string => CryptoJS.SHA256(index+previousHash+timestamp+data).toString();


    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
        ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;

    }
}

const genesisBlock:Block = new Block(0, "20202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

//typescript에서는 이제 block이 아닌 것을 push할 수 없음. 매우 안전
// blockchain.push("stuff");

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block =>{
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
        );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
        );
        return newBlock;
}

console.log(createNewBlock("hello"),createNewBlock("bye bye"));



export {};