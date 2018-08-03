namespace woc.appDomain
{
    public class AvailabilityEntry
    {

        public AvailabilityEntry() 
        {
        }

        public AvailabilityEntry(int Year, int Month, int Precentage)
        {
            this.Year = Year;
            this.Month = Month;
            this.Precentage = Precentage;
        }

        public int Year {get; private set;}
        public int Month {get; private set;}
        public int Precentage {get; private set;}
    }
}