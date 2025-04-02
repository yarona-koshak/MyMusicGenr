using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    AddStartGenres(database);

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          /*──────────────────────────────────╮
          │ Handle your custome requests here │
          ╰──────────────────────────────────*/
          if (request.Path == "signUp")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var userExists = database.Users.Any(user =>
              user.Username == username
            );

            if (!userExists)
            {
              var userId = Guid.NewGuid().ToString();
              database.Users.Add(new User(userId, username, password));
              response.Send(userId);
            }
          }
          else if (request.Path == "logIn")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var user = database.Users.First(
              user => user.Username == username && user.Password == password
            );

            var userId = user.Id;

            response.Send(userId);
          }
          else if (request.Path == "getUsername")
          {
            string userId = request.GetBody<string>();

            var user = database.Users.Find(userId);

            var username = user?.Username;

            response.Send(username);
          }
          else if (request.Path == "getGenres")
          {
            var Genres = database.Genres.ToArray();

            response.Send(Genres);
          }
          else if (request.Path == "getSortedGenres")
          {
            var userId = request.GetBody<string>();

            var uploadedByMe = database.Genres.Where(genr => genr.UploaderId == userId);

            var favorites = database.Favorites
              .Where(favorite => favorite.UserId == userId)
              .Select(favorite => favorite.Genr);

            response.Send((favorites, uploadedByMe));
          }
          // else if (request.Path == "addGenr")
          // {
          //   var (title, author, imageSource, description, uploaderId) =
          //     request.GetBody<(string, string, string, string, string)>();

          //   var Genr = new Genr(title, author, imageSource, description, uploaderId);

          //   database.Genres.Add(Genr);
          // }
          else if (request.Path == "getGenrInfo")
          {
            var (userId, genrId) = request.GetBody<(string?, int)>();

            var uploader = genr.Uploader.Username;

            bool isFavorite = false;
            if (userId != null)
            {
              isFavorite = database.Favorites.Any(
                favorite => favorite.UserId == userId && favorite.genrId == genrId
              );
            }

            response.Send((genr, uploader, isFavorite));
          }
          else if (request.Path == "addToFavorites")
          {
            var (userId, genrId) = request.GetBody<(string, int)>();

            var favorite = new Favorite(userId, genrId);

            database.Favorites.Add(favorite);
          }
          else if (request.Path == "removeFromFavorites")
          {
            var (userId, genrId) = request.GetBody<(string, int)>();

            var favorite = database.Favorites.First(
              favorite => favorite.UserId == userId && favorite.genrId == genrId
            );

            database.Favorites.Remove(favorite);
          }
          else
          {
            response.SetStatusCode(405);
          }

          database.SaveChanges();
        }
        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }

  static void AddStartGenres(Database database)
  {
    if (database.IsNewlyCreated())
    {
      var startUser = new User("startUserId", "Start User", "");

      database.Users.Add(startUser);

      database.SaveChanges();

      var startGenres = new Genr[] {
        new Genr(
          "Pop",
          "The Pop Music",
          "https://yt3.googleusercontent.com/Z8w-S67SqRr1QM3uZVQLzNQc9cIx-l4pokLv17Hd5cnoDIIl16WsNetzycuFeyhKO911kBwbfg=s900-c-k-c0x00ffffff-no-rj",
          "Pop – Music for Everyone In a small café in London, a girl named Anna was sitting with big headphones on, listening to a new hit on the radio. The rhythm was fast, the melody was light and catchy. At that moment, she wanted nothing more than to get up and start dancing. This was her first experience with pop music, and for a moment, the whole world around her filled with joy. Pop is music that brings people together. It was born from a mix of different genres—rock and roll, jazz, even classical music—and became the heartbeat of modern culture. Simple lyrics, bright melodies, and rhythms that make you move—this is what makes pop music beloved by millions around the world. From The Beatles in the ‘60s, Michael Jackson and Madonna in the ‘80s, to Taylor Swift and Billie Eilish today—pop music is constantly evolving, yet it always remains popular. Like an old friend, it is always there, ready to bring joy through its sounds. And Anna? Inspired, she started writing her own songs. Because, just like pop music, she realized that the best way to express emotions is through music. 🎶✨",
          "startUserId"
        ),
        new Genr(
          "Rock",
          "The Rock Music",
          "https://i.scdn.co/image/ab67616d0000b273b1c058783ee6ce6feb83ace3",
          "Rock – The Music of Freedom In an old attic, among dusty vinyl records and a worn-out guitar, Max sat down. He ran his fingers over the strings, and the room filled with a raw, powerful sound. This was rock – music that never stays silent. Rock was born out of rebellion. In the 1950s, young people grew tired of boring melodies and wanted something wild, loud, and real. That’s when The Beatles, The Rolling Stones, and Led Zeppelin appeared – bands that changed the world. Their guitars screamed about freedom, their drums pounded in the rhythm of change. Rock comes in many forms. It can be light, like rock and roll, or heavy, like metal. It can tell stories, like psychedelic rock, or explode with pure energy, like punk. But one thing never changes – rock is the voice of a generation, music that isn’t afraid to tell the truth. Max picked up a guitar pick, strummed the strings, and a powerful riff shattered the silence. At that moment, he realized: rock isn’t just music. It’s a fire that burns inside everyone who wants to change the world. 🎸🔥",
          "startUserId"
        ),
        new Genr(
          "Hip Hop",
          "The Hip Hop Music",
          "https://cdn5.vectorstock.com/i/1000x1000/44/49/hip-hop-music-party-in-graffiti-style-vector-23244449.jpg",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "Electronic",
          "The Electronic Music",
          "https://i.scdn.co/image/ab67616d0000b2733534c71aab61cb98fd2e4597",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "Jazz",
          "The Jazz Music",
          "https://as1.ftcdn.net/v2/jpg/01/93/43/84/1000_F_193438413_HyXCr1RQubvGSQKrKoixqqJCAw5aAReI.jpg",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "Metal",
          "The Metal Music",
          "https://cdn.getmidnight.com/b5a0b552ae89a91aa34705031852bd16/size/w600/2022/11/Instagram-post---1--1-.png",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "R&B",
          "The R&B Music",
          "https://play-lh.googleusercontent.com/XiWVM3fqrBfqyJZ5kNwSzE0AT0vwm75WEkqgdsjzIEGSfb0f6vvytMwzxZGk2hj4pAQ",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "Country",
          "The Country Music",
          "https://img.freepik.com/free-vector/hand-drawn-country-music-illustration_52683-86250.jpg",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "K-pop",
          "The K-Pop Music",
          "https://play-lh.googleusercontent.com/VBhxDnFYm9Ep6I3fLylfbHqSeidtry0cEkNpkTsGIhNxgtvcd20G8tzyoSgyKBJQ6-k",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),
        new Genr(
          "Indie",
          "The Indie Music",
          "https://img.freepik.com/premium-vector/hand-drawn-indie-music-illustration_23-2149676347.jpg",
          "Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive.",
          "startUserId"
        ),

      };

      for (int i = 0; i < startGenres.Length; i++)
      {
        database.Genres.Add(startGenres[i]);
      }

      database.SaveChanges();
    }
  }
}


class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Genr> Genres { get; set; } = default!;
  public DbSet<Favorite> Favorites { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Book(
  string title,
  string author,
  string imageSource,
  string description,
  string uploaderId
)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
  public string Author { get; set; } = author;
  public string ImageSource { get; set; } = imageSource;
  public string Description { get; set; } = description;
  public string UploaderId { get; set; } = uploaderId;
  [ForeignKey("UploaderId")] public User Uploader { get; set; } = default!;
}

class Favorite(string userId, int genrId)
{
  [Key] public int Id { get; set; } = default!;

  public string UserId { get; set; } = userId;
  [ForeignKey("UserId")] public User User { get; set; } = default!;

  public int GenrId { get; set; } = genrId;
  [ForeignKey("GenrId")] public Genr Genr { get; set; } = default!;
}