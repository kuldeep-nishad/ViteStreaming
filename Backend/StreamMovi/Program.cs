using StreamMovi.Email;
using StreamMovi.Repository.HelpSupp_Rep;
using StreamMovi.Repository.Movi_Rep;
using StreamMovi.Repository.Movi_Rep.Interface;
using StreamMovi.Repository.Review_Rep;
using StreamMovi.Repository.User_Rep;
using StreamMovi.Repository.User_Rep.Interface;
using StreamMovi.Services.HelpSuppert_Ser;
using StreamMovi.Services.Movi_Ser;
using StreamMovi.Services.Movi_Ser.Interface;
using StreamMovi.Services.Review_ser;
using StreamMovi.Services.Review_ser.Interface;
using StreamMovi.Services.User_Ser;
using StreamMovi.Services.User_Ser.Interface;
using System.Text.Json;
using static System.Object;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // React app URL
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserReposotory>();
builder.Services.AddScoped<IMoviService, MoviService>();
builder.Services.AddScoped<IMoviRepository, MoviRepository>();
builder.Services.AddScoped<IReviewRepo, ReviewRepo>(); 
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IHelpSuppRepo, HelpSuppRepo>();
builder.Services.AddScoped<IHelpSupportService, HelpSupportService>();
builder.Services.AddSingleton<EmailService>();





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
