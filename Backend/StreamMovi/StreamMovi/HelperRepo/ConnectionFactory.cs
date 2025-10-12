namespace StreamMovi.HelperRepo
{
    public class ConnectionFactory
    {

       
        
                       public const string DefaultCOnnectString = "DefaultConnection";
                        public static string GetConnectionString()
                        {
                            var configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile("appsettings.Development.json")
                                .Build();

                            return configuration.GetConnectionString(DefaultCOnnectString);
                        }
        
    }
}
