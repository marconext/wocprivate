using System;
using System.Collections.Generic;

namespace woc.appService
{
    public class ServiceResponse
    {
        List<ServiceResponseItem> _errors;

        public ServiceResponse() {
            this.Status = ServiceResponseStatusEnum.Ok;
            this._errors = new List<ServiceResponseItem>();
        }

        public ServiceResponseStatusEnum Status {get; private set;}
        public string ErrorMessage {get; private set;}
        public IList<ServiceResponseItem> Errors {get{return this._errors.AsReadOnly();}}

        public void AddError(ServiceResponseItem Error) {
            this._errors.Add(Error);
        }


        /*
            Finalize the Service Response.
            if there are errors, the response Status is Error
            If there is a Message, the response Status is Error
            If no Errors and no Message, the response Status is Ok
        */

        public ServiceResponse Get() {
            this.Status = ServiceResponseStatusEnum.Ok;
            if(this.Errors.Count > 0 || !string.IsNullOrEmpty(this.ErrorMessage)) {
                this.Status = ServiceResponseStatusEnum.Error;
            }
            return this;
        }

        public bool HasErrors() {
            if(this.Errors.Count > 0 || !string.IsNullOrEmpty(this.ErrorMessage)) {
                return true;
            }
            return false;
        }

        public void SetErrorMessage(string Message) {
            this.ErrorMessage = Message;
        }

        public static ServiceResponse GetOk() {
            var r = new ServiceResponse();
            r.Status = ServiceResponseStatusEnum.Ok;
            return r;
        }
    }

    public enum ServiceResponseStatusEnum {
        Ok = 1,
        Error = 0,
    }
}