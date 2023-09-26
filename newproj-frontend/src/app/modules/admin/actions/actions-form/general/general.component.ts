import { Component, Input, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IndretActionCreateFormService, IndretActionPartialUpdateFormService, GeneralMasterTablesListFormService, IndretActionListFormService, IndretCircuitListFormService, UserListFormService } from "api/form-service";
import { Indret, IndretCircuit, User } from "api/model";
import { now, values } from "lodash";
import moment, { Moment } from "moment";
import { Observable, map, of } from "rxjs";
import { SelectAutocompleteComponent } from "../../../../../utils/components/autocompletes/select-autocomplete/select-autocomplete.component";
import { IndretsAutocompleteComponent } from "../../../../../utils/components/autocompletes/indrets-autocomplete/indrets-autocomplete.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-actions-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralActionComponent {

    submitBtnText: string;
    errors = [];
    userDict: { number?: User } = {};
    userList = [];
    hasAddressIndret = 0;

    dataStatus = [{ id: "planned", name: "Planificada" },{ id: "done", name: "Realitzada" },{id: "pending_planning", name: "Pendent planificació" },{ id: "penging_assingnment", name: "Pendient d'asignació" }]

    
    _datetime: Moment;
    modelUser: User;

    formService: IndretActionCreateFormService | IndretActionPartialUpdateFormService;

    @Input()
    isEdit: boolean;
    
    @Input()
    indrets : Indret[]

    circuits$ : Observable<IndretCircuit[]>
    users$ : Observable<User[]>

    @ViewChild(IndretsAutocompleteComponent) indretSelect: IndretsAutocompleteComponent;
    @ViewChild(SelectAutocompleteComponent) selectCircuits: SelectAutocompleteComponent;
    constructor(
        private _matSnackBar: MatSnackBar,
        private _createActionFS: IndretActionCreateFormService,
        private _partialUpdateActionFS: IndretActionPartialUpdateFormService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private _circuitsListFS: IndretCircuitListFormService,
        private _usersListFS: UserListFormService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        if(!this.isEdit){
            this.formService = this._createActionFS;
            this.formService.reset({data:{
                is_presencial:true,
                type_is_alimentary:true,
            }})
        } else {
            this.formService = this._partialUpdateActionFS;
            this.dataStatus.push({ id: "cancelled", name: "Anul·lada" });
        }
        
        this.circuits$  = this._circuitsListFS.submit({indret:this.formService.form.get('data.indret').value,is_active:true}).pipe(map(value=>value.results));
        this._usersListFS.submit().pipe(map(value=>{
            value.results.forEach((area) => {
                this.userDict[area.id] = area;
            });
            this.userList=value.results.map(value=>{return {'id':value.id,'name':value.username}});
            return value.results;
        })).subscribe();

        this.activatedRoute.params
        .subscribe(params => {
            console.log(params)
            if (params.indret) {
                this.formService.patch({data:{indret: params.indret}});
            }
        });
    }

    getCircuits(event){
        this.circuits$  = this._circuitsListFS.submit({indret:this.formService.form.get('data.indret').value,is_active:true}).pipe(map(value=>value.results));
    }

    selectTech(user){
        this.modelUser = user;
    }

    addUsers(user){
        let list = this.formService.form.get('data.technicians').value.filter(tech => tech != user);
        this.formService.form.get('data.technicians').patchValue([...list,user]);
    }
    removeUser(i){
        const list = this.formService.form.get('data.technicians').value.filter((value,index)=>index != i);

        this.formService.form.get('data.technicians').patchValue(list);
    }

}
