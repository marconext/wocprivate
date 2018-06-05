namespace woc.appService
{
    public class ServiceResponseItem
    {
        public ServiceResponseItem(string Name, string Message)
        {
            this.Name = Name;
            this.Message = Message;
        }
        public string Name {get; private set; }
        public string Message { get; private set; }
    }
}