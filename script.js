/* ============================================================
   AKADEMI NINJA KONOHA — Jurus Menghitung Luas Segitiga
   Rumus: Luas = 1/2 x alas x tinggi
   Zein / XI RPL C
   ============================================================ */

// ---------- Ambil elemen yang dibutuhkan ----------
var form          = document.getElementById("form-jurus");
var inputAlas     = document.getElementById("alas");
var inputTinggi   = document.getElementById("tinggi");
var tombolReset   = document.getElementById("tombol-reset");
var panelHasil    = document.getElementById("panel-hasil");
var daftarCatatan = document.getElementById("daftar-catatan");
var catatanKosong = document.getElementById("catatan-kosong");

// Elemen pratinjau segitiga
var bidangSegitiga = document.getElementById("bidang-segitiga");
var garisTinggi    = document.getElementById("garis-tinggi");
var teksAlas       = document.getElementById("teks-alas");
var teksTinggi     = document.getElementById("teks-tinggi");

// ---------- Alat bantu ----------

// Format angka: buang nol di belakang koma, pakai gaya Indonesia (1.234,5)
function formatAngka(angka) {
    return angka.toLocaleString("id-ID", { maximumFractionDigits: 4 });
}

// Tampilkan pesan gagal bertema ninja
function tampilkanGagal(pesan) {
    panelHasil.innerHTML =
        '<div class="kotak-hasil gagal">' +
            '<div class="hasil-atas">' +
                '<i class="fa-solid fa-triangle-exclamation"></i> Jurus Gagal' +
            '</div>' +
            '<p class="pesan-gagal">' + pesan + '</p>' +
        '</div>';
}

// Tampilkan hasil perhitungan
function tampilkanHasil(alas, tinggi, luas) {
    panelHasil.innerHTML =
        '<div class="kotak-hasil sukses">' +
            '<div class="hasil-atas">' +
                '<i class="fa-solid fa-fire"></i> Misi Berhasil — Luas Segitiga' +
            '</div>' +
            '<div class="angka-hasil">' +
                formatAngka(luas) +
                '<span class="satuan">satuan&sup2;</span>' +
            '</div>' +
            '<div class="jalan-rumus">' +
                '<i class="fa-solid fa-scroll"></i> <strong>Langkah jurus:</strong><br>' +
                'Luas = &frac12; &times; alas &times; tinggi<br>' +
                'Luas = &frac12; &times; ' + formatAngka(alas) + ' &times; ' + formatAngka(tinggi) + '<br>' +
                'Luas = <strong>' + formatAngka(luas) + '</strong>' +
            '</div>' +
        '</div>';
}

// Tandai input yang salah supaya bergetar merah
function tandaiSalah(input) {
    input.classList.remove("salah");
    // paksa browser menjalankan ulang animasinya
    void input.offsetWidth;
    input.classList.add("salah");
}

function bersihkanTanda() {
    inputAlas.classList.remove("salah");
    inputTinggi.classList.remove("salah");
}

// ---------- Gambar ulang pratinjau segitiga ----------
function gambarPratinjau() {
    var alas   = parseFloat(inputAlas.value);
    var tinggi = parseFloat(inputTinggi.value);

    // Kalau belum diisi / tidak valid, pakai bentuk contoh
    if (!isFinite(alas) || alas <= 0)   { alas   = 4; }
    if (!isFinite(tinggi) || tinggi <= 0) { tinggi = 3; }

    var lebarMaks  = 190;   // batas lebar di dalam viewBox 260x150
    var tinggiMaks = 90;
    var skala      = Math.min(lebarMaks / alas, tinggiMaks / tinggi);

    var lebar = alas * skala;
    var tingg = tinggi * skala;

    var pusatX  = 130;      // tengah viewBox
    var dasarY  = 125;      // garis alas
    var kiriX   = pusatX - lebar / 2;
    var kananX  = pusatX + lebar / 2;
    var puncakY = dasarY - tingg;

    bidangSegitiga.setAttribute(
        "points",
        kiriX + "," + dasarY + " " + kananX + "," + dasarY + " " + pusatX + "," + puncakY
    );

    garisTinggi.setAttribute("x1", pusatX);
    garisTinggi.setAttribute("y1", puncakY);
    garisTinggi.setAttribute("x2", pusatX);
    garisTinggi.setAttribute("y2", dasarY);

    teksAlas.setAttribute("y", dasarY + 17);
    teksAlas.textContent = "alas = " + formatAngka(alas);

    teksTinggi.setAttribute("x", pusatX + 8);
    teksTinggi.setAttribute("y", dasarY - tingg / 2);
    teksTinggi.textContent = "tinggi = " + formatAngka(tinggi);
}

// ---------- Catatan misi ----------
function catatMisi(alas, tinggi, luas) {
    catatanKosong.style.display = "none";

    var item = document.createElement("li");
    item.innerHTML =
        '<span>Alas ' + formatAngka(alas) + ' &times; Tinggi ' + formatAngka(tinggi) + '</span>' +
        '<span class="luas">' + formatAngka(luas) + '</span>';

    daftarCatatan.insertBefore(item, daftarCatatan.firstChild);

    // Simpan maksimal 5 catatan terakhir saja
    while (daftarCatatan.children.length > 5) {
        daftarCatatan.removeChild(daftarCatatan.lastChild);
    }
}

// ---------- Jurus utama: hitung luas ----------
function hitungLuas() {
    bersihkanTanda();

    var nilaiAlas   = inputAlas.value.trim();
    var nilaiTinggi = inputTinggi.value.trim();

    // 1. Cek masih kosong
    if (nilaiAlas === "" || nilaiTinggi === "") {
        if (nilaiAlas === "")   { tandaiSalah(inputAlas); }
        if (nilaiTinggi === "") { tandaiSalah(inputTinggi); }
        tampilkanGagal("Chakra belum terkumpul! Isi dulu alas dan tinggi segitiganya.");
        return;
    }

    var alas   = parseFloat(nilaiAlas);
    var tinggi = parseFloat(nilaiTinggi);

    // 2. Cek benar-benar angka
    if (!isFinite(alas) || !isFinite(tinggi)) {
        if (!isFinite(alas))   { tandaiSalah(inputAlas); }
        if (!isFinite(tinggi)) { tandaiSalah(inputTinggi); }
        tampilkanGagal("Segel jurusnya salah! Alas dan tinggi harus berupa angka.");
        return;
    }

    // 3. Cek harus lebih dari nol
    if (alas <= 0 || tinggi <= 0) {
        if (alas <= 0)   { tandaiSalah(inputAlas); }
        if (tinggi <= 0) { tandaiSalah(inputTinggi); }
        tampilkanGagal("Jurus gagal! Alas dan tinggi harus lebih besar dari 0.");
        return;
    }

    // 4. Hitung dan tampilkan
    var luas = 0.5 * alas * tinggi;

    tampilkanHasil(alas, tinggi, luas);
    catatMisi(alas, tinggi, luas);
    gambarPratinjau();
}

// ---------- Reset (Kai!) ----------
function resetJurus() {
    form.reset();
    bersihkanTanda();
    panelHasil.innerHTML = "";
    gambarPratinjau();
    inputAlas.focus();
}

// ---------- Pasang event ----------
form.addEventListener("submit", function (e) {
    e.preventDefault();      // biar halaman tidak reload
    hitungLuas();
});

tombolReset.addEventListener("click", resetJurus);

// Pratinjau ikut berubah sambil mengetik
inputAlas.addEventListener("input", gambarPratinjau);
inputTinggi.addEventListener("input", gambarPratinjau);

// Gambar pratinjau awal saat halaman dibuka
gambarPratinjau();
