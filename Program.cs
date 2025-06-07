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

            response.Send(favorites);
          }
          else if (request.Path == "getGenrInfo")
          {
            var (userId, genrId) = request.GetBody<(string?, int)>();

            var genr = database.Genres
              .First(genr => genr.Id == genrId)!;

            bool isFavorite = false;
            if (userId != null)
            {
              isFavorite = database.Favorites.Any(
                favorite => favorite.UserId == userId && favorite.GenrId == genrId
              );
            }

            response.Send((genr, isFavorite));
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
          "/website/images/avatar_1.png",
          "🎤 Pop Music — A Mirror of Time and the Voice of Millions. Pop music (from popular) is the most universal and widely loved music genre. It’s known for catchy melodies, clear structure (verse–chorus), emotional delivery, and relatable themes like love, freedom, and personal growth. Pop easily blends with other styles — rock, electronic, hip-hop — staying fresh and relevant. Here are three legendary icons of pop:🔹 Michael Jackson — The King of Pop, who revolutionized music with groundbreaking videos, dance moves, and hits like Billie Jean. 🔹 Madonna — The Queen of Pop, bold and innovative, known for pushing boundaries with songs like Like a Prayer. 🔹 Taylor Swift — A modern pop icon, mixing poetic lyrics with strong melodies and global impact. Three defining pop hits: 🎶 Billie Jean — a rhythmic, mysterious classic by Jackson. 🎶 Like a Prayer — a fearless, emotional anthem by Madonna. 🎶 Rolling in the Deep — Adele’s powerful blend of pain and strength. Pop is more than just music — it’s emotion, culture, and the sound of our time."
        ),
        new Genr(
          "Rock",
          "/website/images/avatar_8.png",
          "🎸 Rock Music — The Energy of Freedom and Rebellion. Rock emerged in the 1950s–60s as a voice of protest and freedom. Built on guitar riffs, powerful drums, and strong vocals, it evolved into many subgenres — from classic rock to punk and grunge — but its core remains the same: strength, honesty, and independence. Rock lyrics often tackle important themes like love, loneliness, rebellion, and inner struggles. It’s music that speaks loud and clear without fear. Iconic artists include: 🔹 Queen — unique style, Freddie Mercury’s charisma, and the hit Bohemian Rhapsody. 🔹 The Beatles — revolutionized music with classics like Hey Jude and Come Together. 🔹 Nirvana — the grunge voice of the ’90s with the anthem Smells Like Teen Spirit. Three legendary hits: 🎶 Bohemian Rhapsody — an epic masterpiece by Queen. 🎶 Stairway to Heaven — a mystical ballad by Led Zeppelin. 🎶 Smells Like Teen Spirit — the ’90s teen anthem by Nirvana. Rock is rhythm, passion, and freedom in every note."
        ),
        new Genr(
          "Hip Hop",
          "/website/images/avatar_2.png",
          "🎤 Хип-хоп — голос улиц и ритм поколения. Хип-хоп возник в 1970-х в Нью-Йорке как музыкальное и культурное движение, объединяющее рэп, диджеинг и брейк-данс. Основой жанра стал речитатив — рэп — и мощные биты с сэмплами. В текстах часто звучат темы борьбы, жизни и успеха. Три самых известных исполнителя: 🔹 2Pac — легенда с хитами Changes и California Love. 🔹 The Notorious B.I.G. — культовый рэпер с треками Juicy и Big Poppa. 🔹 Eminem — мастер лирики, известный песнями Lose Yourself и Stan. Топ-3 хита: 🎶 Lose Yourself — мощный гимн от Eminem. 🎶 California Love — классика 2Pac. 🎶 Juicy — культовый трек Biggie. Хип-хоп — это энергия, история и культура, меняющая мир."

        ),
        new Genr(
          "Electronic",
          "/website/images/avatar_9.png",
          "🎧 Electronic Music — The Sound of the Future and Creativity. Electronic music is a genre based on synthesizers, drum machines, and samples. Emerging in the late 20th century, it quickly gained popularity by creating unique sound worlds — from energetic dance tracks to atmospheric compositions. Electronic music includes many styles like techno, house, ambient, and often blends with pop and hip-hop. Three of the most famous artists: 🔹 Daft Punk — legendary duo with hits like One More Time and Get Lucky, who changed electronic music forever. 🔹 Calvin Harris — producer and DJ known for his melodic tracks Summer and Feel So Close. 🔹 Deadmau5 — master of atmospheric and deep tracks like Strobe and Ghosts 'n' Stuff. Top three hits: 🎶 One More Time — Daft Punk’s iconic track. 🎶 Summer — Calvin Harris’ popular hit. 🎶 Strobe — Deadmau5’s deep and atmospheric composition. Electronic music is constant evolution, experimentation, and inspiration for millions."

        ),
        new Genr(
          "Jazz",
          "/website/images/avatar_5.png",
          "🎷 Jazz — The Freedom of Improvisation and Soulful Music. Jazz originated in the early 20th century in the USA within African American communities and quickly became one of the most influential musical genres. It combines elements of blues, ragtime, gospel, and classical music, with improvisation and free musical expression as its core.Jazz can be both soft and lyrical or energetic and lively. Vocals and instrumental parts blend closely, creating a unique atmosphere of live musical conversation. Three of the most famous jazz artists: 🔹 Louis Armstrong — legendary trumpeter and singer, known for classics like What a Wonderful World and La Vie En Rose. 🔹 Miles Davis — outstanding trumpeter and composer, famous for his experiments and the album Kind of Blue. 🔹 Ella Fitzgerald — the “Queen of Jazz,” famous for her unique voice and songs like Summertime and Dream a Little Dream of Me. Top three popular jazz hits: 🎶 What a Wonderful World — gentle and inspiring song by Louis Armstrong. 🎶 Take Five — rhythmic and iconic track by Dave Brubeck, one of the most famous jazz instrumentals. 🎶 Summertime — classic composition performed by Ella Fitzgerald. Jazz is music of the soul, freedom, and the endless search for new sounds."
        ),
        new Genr(
          "Metal",
          "/website/images/avatar_6.png",
          "🤘 Metal — Power, Energy, and Intense Sound. Metal is a subgenre of rock music that emerged in the late 1960s and early 1970s. It is characterized by heavy sound, loud guitar riffs, fast drums, and powerful vocals ranging from clean singing to growls and screams. Metal often expresses strong emotions, rebellion, and protest, with lyrics about struggle, inner strength, and worldview. Over the decades, metal has split into many subgenres—from classic heavy metal to thrash, death metal, and symphonic metal. It’s a genre for those who love powerful music with emotional and technical depth. Three of the most popular metal bands: 🔹 Metallica — one of the most influential metal bands in history, known for hits like Enter Sandman and Nothing Else Matters. 🔹 Iron Maiden — legendary British band with tracks like The Number of the Beast and Fear of the Dark. 🔹 Black Sabbath — pioneers of the genre and creators of heavy sound, famous for songs like Paranoid and Iron Man. Top three popular metal hits: 🎸 Enter Sandman — iconic Metallica track with a powerful riff and drive. 🎸 The Number of the Beast — classic Iron Maiden song with a memorable melody and lyrics. 🎸 Paranoid — one of Black Sabbath’s most famous tracks that laid the foundation for metal. Metal is music full of power, emotion, and real energy, inspiring millions of fans worldwide."

        ),
        new Genr(
          "R&B",
          "/website/images/avatar_3.png",
          "🎶 R&B — The Rhythm and Soul of Music. R&B (rhythm and blues) is a genre that originated in the 1940s in the USA, blending soul, funk, jazz, and pop. It features expressive vocals, smooth melodies, and rhythmic beats, often focusing on themes of love, emotions, and life. The genre has evolved over time and now includes both classic styles and modern directions mixed with hip-hop and pop. Three of the most popular R&B artists: 🔹 Michael Jackson — the King of Pop, whose R&B hits like Billie Jean and Thriller became legendary. 🔹 Beyoncé — a modern R&B icon with hits like Crazy in Love and Irreplaceable. 🔹 Usher — one of the best performers with hits like Yeah! and Burn. Top three popular hits: 🎵 Billie Jean — Michael Jackson’s iconic song. 🎵 Crazy in Love — Beyoncé’s energetic hit. 🎵 Yeah! — Usher’s dance track. R&B is music that combines rhythm and soul, delivering emotion and mood."
        ),
        new Genr(
          "Country",
          "/website/images/avatar_7.png",
          "🎸 Country — Music of Simplicity and Heart. Country is a genre that originated in the early 20th century in the southern United States. It combines elements of folk, blues, and gospel, telling stories about life, love, family, and simple joys. Country music is characterized by warm melodies, acoustic guitars, fiddles, and a distinctive vocal style.The genre is very popular in the USA and has many subgenres — from traditional country to country rock and pop country. Three of the most popular country artists: 🔹 Johnny Cash — a country legend known for hits like Ring of Fire and Folsom Prison Blues. 🔹 Dolly Parton — one of the most famous country singers with songs like Jolene and 9 to 5. 🔹 Garth Brooks — a star of modern country with tracks like Friends in Low Places and The Dance. Top three popular country hits:🎵 Ring of Fire — a bright and memorable track by Johnny Cash. 🎵 Jolene — an emotional song by Dolly Parton. 🎵 Friends in Low Places — a hit by Garth Brooks that became an anthem of the genre. Country is sincere, heartfelt music that tells stories about the lives and feelings of everyday people."
        ),
        new Genr(
          "K-pop",
          "/website/images/avatar_10.png",
          "🌟 K-pop — A Bright and Energetic Musical Phenomenon. K-pop (Korean popular music) is a genre that originated in South Korea and quickly became a global phenomenon. K-pop combines various musical styles—pop, hip-hop, R&B, EDM, and more—creating vibrant and memorable tracks with energetic choreography and stylish music videos. K-pop artists are known for their charisma, carefully crafted images, and high-level performances. This genre is very popular among young people worldwide. Three of the most popular K-pop artists: 🔹 BTS — an international superstar group with hits like Dynamite and Butter. 🔹 BLACKPINK — one of the most popular girl groups with tracks like How You Like That and Kill This Love. 🔹 EXO — a successful boy band with songs like Growl and Love Shot. Top three popular K-pop hits: 🎵 Dynamite — a bright and energetic BTS track that conquered charts worldwide. 🎵 How You Like That — a powerful and stylish hit by BLACKPINK. 🎵 Growl — one of EXO’s most popular songs. K-pop is colorful, modern, and very energetic music that unites fans around the world."

        ),
        new Genr(
          "Indie",
          "/website/images/avatar_4.png",
          "🎸 Indie — Music of Freedom and Self-Expression. Indie  is a genre that emerged as an alternative to the mainstream. It’s music created by independent artists and bands, often featuring experimental and unique sounds. Indie includes various styles—from indie rock to indie pop and folk. Indie artists are valued for their sincerity, creative freedom, and originality. Their music is often emotional and personal, with lyrics that tell stories about inner feelings and life perspectives. Three of the most popular indie artists: 🔹 Arctic Monkeys — a British indie rock band known for hits like Do I Wanna Know? and I Bet You Look Good on the Dancefloor. 🔹 Florence + The Machine — powerful indie pop with tracks like Dog Days Are Over and Shake It Out. 🔹 The Strokes — an iconic band with songs like Last Nite and Someday. Top three popular indie hits: 🎵 Do I Wanna Know? — one of Arctic Monkeys’ most recognizable tracks. 🎵 Dog Days Are Over — a bright and emotional song by Florence + The Machine. 🎵 Last Nite — a hit by The Strokes that became an anthem of indie rock. Indie is music of creativity and freedom that inspires listeners to find their own unique sound."

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
}

class Favorite(string userId, int genrId)
{
  [Key] public int Id { get; set; } = default!;

  public string UserId { get; set; } = userId;
  [ForeignKey("UserId")] public User User { get; set; } = default!;

  public int GenrId { get; set; } = genrId;
  [ForeignKey("GenrId")] public Genr Genr { get; set; } = default!;
}