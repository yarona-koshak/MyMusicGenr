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
            var genres = database.Genres.ToArray();

            response.Send(genres);
          }
          else if (request.Path == "getSortedGenres")
          {
            var userId = request.GetBody<string>();


            var favorites = database.Favorites
              .Where(favorite => favorite.UserId == userId)
              .Select(favorite => favorite.Genr);

            response.Send((favorites));
          }
          else if (request.Path == "addGenr")
          {
            var (title, imageSource, description) =
              request.GetBody<(string, string, string)>();

            var genr = new Genr(title, imageSource, description);

            database.Genres.Add(genr);
          }
          else if (request.Path == "getGenrInfo")
          {
            var (userId, genrId) = request.GetBody<(string?, int)>();

            var genr = database.Genres
              .Include(genr => genr.Uploader)
              .First(genr => genr.Id == genrId)!;

            var uploader = genr.Uploader.Username;

            bool isFavorite = false;
            if (userId != null)
            {
              isFavorite = database.Favorites.Any(
                favorite => favorite.UserId == userId && favorite.GenrId == genrId
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
              favorite => favorite.UserId == userId && favorite.GenrId == genrId
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
          "https://yt3.googleusercontent.com/Z8w-S67SqRr1QM3uZVQLzNQc9cIx-l4pokLv17Hd5cnoDIIl16WsNetzycuFeyhKO911kBwbfg=s900-c-k-c0x00ffffff-no-rj",
          "Pop – Music for Everyone: Pop is music that brings people together. It was born from a mix of different genres—rock and roll, jazz, even classical music—and became the heartbeat of modern culture. Simple lyrics, bright melodies, and rhythms that make you move—this is what makes pop music beloved by millions around the world. From The Beatles in the ‘60s, Michael Jackson and Madonna in the ‘80s, to Taylor Swift and Billie Eilish today—pop music is constantly evolving, yet it always remains popular. Like an old friend, it is always there, ready to bring joy through its sounds.🎶✨"

        ),
        new Genr(
          "Rock",
          "https://i.scdn.co/image/ab67616d0000b273b1c058783ee6ce6feb83ace3",
          "Rock – The Music of Fredoom: Rock was born out of rebellion. In the 1950s, young people grew tired of boring melodies and wanted something wild, loud, and real. That’s when The Beatles, The Rolling Stones, and Led Zeppelin appeared – bands that changed the world. Their guitars screamed about freedom, their drums pounded in the rhythm of change. Rock comes in many forms. It can be light, like rock and roll, or heavy, like metal. It can tell stories, like psychedelic rock, or explode with pure energy, like punk. But one thing never changes – rock is the voice of a generation, music that isn’t afraid to tell the truth.🎸🔥"
        ),
        new Genr(
          "Hip Hop",
          "https://cdn5.vectorstock.com/i/1000x1000/44/49/hip-hop-music-party-in-graffiti-style-vector-23244449.jpg",
          "Hip-Hop – The Voice of the Streets: Hip-hop emerged in the 1970s in the poor neighborhoods of New York. Young people were searching for their voice – and they found it in rhymes and beats. The first DJs mixed rhythms, while MCs rapped about life, struggles, and dreams. That’s how 2Pac, The Notorious B.I.G., Eminem, and Kanye West came to be – artists whose words changed the world. Hip-hop is more than just music. It’s a style, a culture, a protest. It’s breakdancing, graffiti, beat-making. It’s rhymes that make you think and beats that make you move. 🎤🔥"

        ),
        new Genr(
          "Electronic",
          "https://i.scdn.co/image/ab67616d0000b2733534c71aab61cb98fd2e4597",
          "Electronic Music – The Rhythm of the Future: Electronic music was born in sound laboratories, where composers searched for new ways to create melodies. Synthesizers, drum machines, computers – all of these replaced traditional instruments. That’s how techno, house, trance, and drum and bass emerged – genres that filled dance floors around the world. But electronic music isn’t just about parties. It’s the soundtracks of movies, atmospheric melodies that transport us to other worlds, and sonic experiments that push the boundaries of what’s possible.🎧✨"

        ),
        new Genr(
          "Jazz",
          "https://as1.ftcdn.net/v2/jpg/01/93/43/84/1000_F_193438413_HyXCr1RQubvGSQKrKoixqqJCAw5aAReI.jpg",
          "Jazz – The Music of the Soul: Jazz was born on the streets of New Orleans in the early 20th century. It absorbed African rhythms, blues melodies, and classical influences. There are no strict rules – every musician adds something personal, playing exactly as they feel in the moment. This is how legends like Louis Armstrong, Miles Davis, and Ella Fitzgerald were born.Jazz is a conversation without words. It can be soft and tender, like blues, or fast and fiery, like swing. It changes, flows, and lives its own life. 🎷🎶"
        ),
        new Genr(
          "Metal",
          "https://cdn.getmidnight.com/b5a0b552ae89a91aa34705031852bd16/size/w600/2022/11/Instagram-post---1--1-.png",
          "Metal – The Music of Power: Metal was born from rock in the late ‘60s – heavier, louder, more aggressive. Black Sabbath, Metallica, Iron Maiden – these bands shaped a genre that became the voice of those unafraid to speak the truth. Sharp guitar riffs, blazing solos, deep lyrics – metal unites those who feel music with their hearts. There’s melodic heavy metal, dark doom, fast thrash, and extreme death metal – everyone can find their sound. But one thing remains true in all of them – honesty. Metal isn’t just music; it’s a way to express what words alone can’t.🎸🔥"

        ),
        new Genr(
          "R&B",
          "https://play-lh.googleusercontent.com/XiWVM3fqrBfqyJZ5kNwSzE0AT0vwm75WEkqgdsjzIEGSfb0f6vvytMwzxZGk2hj4pAQ",
          "R&B – The Music of the Heart: R&B (Rhythm and Blues) was born in the 1940s when African American musicians began blending blues, jazz, and gospel with modern rhythms. Over time, it evolved into a style full of passion and melody. Ray Charles, Whitney Houston, Alicia Keys, The Weeknd – their songs became symbols of love, freedom, and life. Modern R&B is a fusion of soulful vocals, hip-hop beats, and deep lyrics. It can be soft and romantic or rhythmic and energetic, but it is always filled with real emotions.🎶❤️"
        ),
        new Genr(
          "Country",
          "https://img.freepik.com/free-vector/hand-drawn-country-music-illustration_52683-86250.jpg",
          "Country – The Music of the Heart and Land: Country music was born in the southern United States in the early 20th century when musicians started blending folk, blues, and old ballads. Simple guitars, fiddles, and mandolins created a sound that became a symbol of rural life. The country world has always been filled with stories of lost love, hard times, and dreams. Artists like Johnny Cash, Dolly Parton, and Willie Nelson gave country its golden hits, filled with wisdom and strength. Country music isn’t just tunes; it’s a way of life, connected to nature, sincerity, and hard work.🎸🌾"
        ),
        new Genr(
          "K-pop",
          "https://play-lh.googleusercontent.com/VBhxDnFYm9Ep6I3fLylfbHqSeidtry0cEkNpkTsGIhNxgtvcd20G8tzyoSgyKBJQ6-k",
          "K-Pop – The Music of a Global Phenomenon: K-pop (Korean pop music) was born in South Korea in the 1990s and has since become a global phenomenon. Groups like BTS, BLACKPINK, and EXO captured the hearts of millions of fans worldwide. They combine captivating rhythms, amazing dance moves, and carefully crafted visuals. K-pop is not just music; it’s an entire industry where every detail – from production to fan interaction – matters. K-pop melodies are often bright and energetic, and the music videos are true visual masterpieces. This world is impossible not to fall in love with, as K-pop unites people through music, dance, and unique culture.🎶🌏"

        ),
        new Genr(
          "Indie",
          "https://img.freepik.com/premium-vector/hand-drawn-indie-music-illustration_23-2149676347.jpg",
          "Indie – The Music of Independence: Indie was born in the 1980s when musicians started releasing their records without support from major labels. With this style came freedom – the freedom of self-expression, independence from commercial success. Artists like The Strokes, Arctic Monkeys, Tame Impala, and many others brought indie music popularity but still maintained their uniqueness. Indie can be anything – from soft folk to experimental electro. It’s music that reflects people’s feelings and experiences without trying to please everyone.🎸🎶"

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

class Genr(
  string title,
  string imageSource,
  string description
)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
  public string ImageSource { get; set; } = imageSource;
  public string Description { get; set; } = description;
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