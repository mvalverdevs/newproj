import { Injectable } from "@angular/core";

import { NgZone } from '@angular/core';

@Injectable()
export class IndretControlsService {

    objectsBehaviours = {}

    constructor(){
    }

    setBehaviour(name, list_visibles){
        this.objectsBehaviours[name]=list_visibles;
    }

    getBehaviour(name){
        return this.objectsBehaviours[name];
    }

    canShow(name:string ,ids:number[]) : boolean{
        let bool = false;
        if(this.getBehaviour(name) && ids && ids.length>0){
            ids.forEach(
                id=>{
                    bool= bool || this.getBehaviour(name).includes(id);
                }
            )
        }
        return bool;
    }    

}