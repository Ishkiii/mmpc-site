# MM PC Servis – web stranica (HR + EN) · https://mmpc.info

Nova stranica **MM PC Servis** u izgledu servisa računala, na hrvatskom i engleskom.
Sav sadržaj, linkovi, kontakti i SEO podaci isti su kao na sadašnjoj stranici
(https://mmpcservis.github.io/mmpcservis/). Novo je samo:

- izgled,
- engleska verzija,
- sekcija **Projekti** s najavom CafeOS-a.

## Datoteke

| Datoteka | Čemu služi |
|---|---|
| `index.html` | stranica na hrvatskom (glavna) |
| `en.html` | ista stranica na engleskom |
| `style.css` | izgled, zajednički za obje stranice |
| `site.js` | galerija slika CafeOS-a (povećanje slike na klik) |
| `projekti/` | mapa za snimke zaslona CafeOS-a (upute su u `projekti/README.md`) |


Logo, ikonica u kartici preglednika, ikona za početni zaslon mobitela i sve ikonice na stranici
**ugrađene su u same HTML datoteke**. Ne trebaju nikakve slike sa strane.
Jedina iznimka je slika za pregled linka na Facebooku/WhatsAppu (`og:image`):
ona mora biti prava datoteka, pa i dalje koristi postojeći `logo.png`.

Gumb **HR | EN** gore desno prebacuje između jezika.
Kad mijenjaš tekst, promijeni ga u **obje** datoteke (`index.html` i `en.html`).

## Slike CafeOS-a (sekcija Projekti)

1. Napravi snimke zaslona CafeOS-a. Na slikama ne smiju biti imena kupaca, lozinke ni tokeni.
2. Nazovi ih `cafeos-1.jpg` do `cafeos-6.jpg` (može i `.png` ili `.webp`).
3. Na GitHubu otvori mapu `projekti` → **Add file** → **Upload files** → povuci slike → **Commit changes**.

Slike koje ne staviš se same sakriju. Dok nema nijedne, sekcija prikazuje malu CafeOS ploču i natpis "Snimke zaslona uskoro".

## 1) Preview, besplatno, prije prave objave

1. Prijavi se na GitHub kao **mmpcservis**, pa **+** → **New repository**.
   Ime: `preview`, **Public** → **Create repository**.
2. Klikni **uploading an existing file**.
   Povuci sve datoteke **i mapu `projekti`** → **Commit changes**.
3. Otvori **Settings** → **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, **/ (root)** → **Save**
4. Za 1–2 minute stranica je na adresi **https://mmpcservis.github.io/preview/**.

## 2) Prava stranica na repozitoriju mmpcservis

1. Otvori repozitorij **mmpcservis** → **Add file** → **Upload files**.
2. Povuci `index.html`, `en.html`, `style.css`, `site.js` i mapu `projekti`.
   Isti nazivi se zamijene → **Commit changes**.
   Staru verziju uvijek možeš vratiti preko **History**.

## 3) Domena mmpc.info

Datoteke su već podešene za **https://mmpc.info**: Google, hreflang (HR/EN) i pregled linka.

**Kod registra domene** → DNS postavke:

1. Obriši zapise za "parking" i preusmjeravanje (URL forwarding) ako postoje.
2. Dodaj:

| Tip | Ime / Host | Vrijednost |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | mmpcservis.github.io |

**Na GitHubu**, u repozitoriju **mmpcservis**:

1. Otvori **Settings** → **Pages** → **Custom domain**.
2. Upiši `mmpc.info` (bez www) → **Save**.
   GitHub sam doda datoteku `CNAME`, nemoj je brisati.
3. Kad provjera prođe (od nekoliko minuta do 24 h), uključi **Enforce HTTPS**.
4. Preporuka: u postavkama računa otvori **Settings** → **Pages** → **Add a domain** i dodaj TXT zapis koji ti GitHub pokaže.
   Tako nitko drugi ne može spojiti tvoju domenu na svoju stranicu.

Nakon toga:

- `www.mmpc.info` i stara adresa `mmpcservis.github.io/mmpcservis` same preusmjeravaju na **https://mmpc.info**.
- Engleska stranica je na **https://mmpc.info/en.html**.

---
® MMPC
