# event_manager
Programiranje za internet -> zavrsni projekt

Cilj ovog projekta je primjeniti sve vještine usvojene kroz labaratorijske vježbe kroz stvaranje web stranice koja imitira pogled admina na stranicu za pregled i manipulaciju događajima na nekoj lokaciji u nekom vremenu (koncert, humanitarna akcija, advent, javna izložba...).

U opisu bit će zadan popis funkcionalnosti koje web stranica treba imati, a na vama je da sami osmislite svoj dizajn kojim ćete prikazati usvojeno znanje. Npr. Prilikom stvaranja novog eventa mora se odabrati razdoblje odvijanja tog događaja preko custom date pickera. Što znači da sami morate implementirati svoj date picker (ne koristiti defaultni browserov), ali njegov izgled, način odabira datuma, hoće li taj odabir biti unutar modala, na novoj stranici, unutar dropdowna, hoće li prilikom odabira biti 1 date picker za start i 1 za odabir end datuma ili samo 1 za oba i slične odluke vezane za dizajn su upotpunosti vama na odabir.

Kako cilj projekta je primjena naučenih vještina, to uključuje i HTML i CSS i JavaScript. To znači da funkcionalnost s maksimalno pojednostavljenim izgledom bez primjena naučenih vještina CSS-a i vice versa, kompliciranje izgleda bez implementacije funkcionalnosti ne zadovoljava taj cilj.

HTML, CSS i JavaScript kod treba biti strukturiran prema načelima naučenim na vježbama. Sav kod (imena varijabli, funkcija, klasa, atributa...) mora biti napisan na engleskom jeziku (za sadržaj same stranice nije bitno).

Web stranica treba biti prilagođena za mobilne uređaje.

Opis:

Svaki "event" mora imati sljedeće: naslov, naslovnu sliku, opis, lokaciju, datum početka i datum završetka
Korisnik može stvoriti novi event
Novi event se dodaje na stranicu ali i u localStorage tako da je i dalje prisutan na stranici nakon refresha.
Za odabir datuma se koristi custom kalendar (ne koristiti defaultne input type date kalendare). 
Treba imati mogućnost "prebacivanja/odabira" mjeseca i godine
Treba biti prikazano koji je trenutni mjesec i godina
Treba biti označen trenutni datum na kalendaru
Treba biti jasno koji je range datuma odabran (start-end date) 
obratiti pozornost na edgecase scenarije vezane za datume (datum početka nesmije biti veći od datuma završetka, ali mogu biti isti - event koji traje samo jedan dan ...)
Lokacija eventa može biti bilo koji glavni grad, popis svih lokacija/glavnih gradova dohvatiti fetch apijom s https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json
Lokacija neka bude formatirana kao "Glavni Grad, Država"
U slučaju da ne postoji glavni grad, prikazati samo ime države
Korisnik ima pregled svih eventova, prilikom refresha oni ne nestaju nego se učitavaju iz localStorage
Korisnik može filtrirati eventove po lokaciji
Korisnik može brisati postojeći event.
