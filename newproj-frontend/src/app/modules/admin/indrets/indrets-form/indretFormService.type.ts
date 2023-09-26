import {
    IndretPartialUpdateFormService,
    IndretCreateFormService,
} from 'api/form-service';

export type IndretFormService = IndretPartialUpdateFormService
    | IndretCreateFormService
    ;
