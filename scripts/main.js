const elemenGiliranSpan = document.getElementById('span-giliran');
const arrTombolPapan = document.querySelectorAll('.tombol-papan');
const elemenPemenangSpan = document.getElementById('span-pemenang');
const tombolRefresh = document.getElementById('tombol-refresh');

const papanPermainan = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let pemenang = '';

const objTombolPapan = {};
for (let baris = 0; baris <= 2; baris++) {
    for (let kolom = 0; kolom <= 2; kolom++) {
        objTombolPapan[`at${baris}${kolom}`] = document.querySelector(`.tombol-${baris}${kolom}`);
        objTombolPapan[`at${baris}${kolom}`].addEventListener('click', (e) => {
            if (
                e.target.innerText === '' &&
                !pemenang
            ) {
                e.target.innerText = elemenGiliranSpan.innerText;
                isiPapanPermainan(e.target.innerText, baris, kolom);
                cekPemenang();
                ubahGiliran();
            }
        });
    }
}

function isiPapanPermainan(value, baris, kolom) {
    papanPermainan[baris][kolom] = value;
}

function ubahGiliran() {
    const giliran = elemenGiliranSpan.innerText;
    elemenGiliranSpan.innerText = (giliran === 'O') ? 'X': 'O';
}

function cekPemenang() {
    // pengecekan baris
    for (let baris = 0; baris < 3; baris++) {
        if (
            papanPermainan[baris][0] !== '' &&
            papanPermainan[baris][0] === papanPermainan[baris][1] &&
            papanPermainan[baris][0] === papanPermainan[baris][2]
        ) {
            pemenang = papanPermainan[baris][0]; // mengbalikan nilai pemain yang menang (X/0)
            displayPemenang();
            return;
        }
    }
    // pengecekan kolom
    for (let kolom = 0; kolom < 3; kolom++) {
        if (
            papanPermainan[0][kolom] !== '' &&
            papanPermainan[0][kolom] === papanPermainan[1][kolom] &&
            papanPermainan[0][kolom] === papanPermainan[2][kolom]
        ) {
            pemenang = papanPermainan[0][kolom];
            displayPemenang();
            return;
        }
    }
    // pengecekan diagonal primer
    if (
        papanPermainan[0][0] !== '' &&
        papanPermainan[0][0] === papanPermainan[1][1] &&
        papanPermainan[0][0] === papanPermainan[2][2]
    ) {
        pemenang = papanPermainan[0][0];
        displayPemenang();
        return;
    }
    // pengecekan diagonal sekunder
    if (
        papanPermainan[0][2] !== '' &&
        papanPermainan[0][2] === papanPermainan[1][1] &&
        papanPermainan[0][2] === papanPermainan[2][0]
    ) {
        pemenang = papanPermainan[0][2];
        displayPemenang();
        return;
    }
    // pengecekan seri
    let isSeri = true;
    for (let baris = 0; baris < 3; baris++) {
        for (let kolom = 0; kolom < 3; kolom++) {
            if (papanPermainan[baris][kolom] === '') {
                isSeri = false;
                break;
            }
        }
        if (!isSeri) {
            break;
        }
    }
    if (isSeri) {
        pemenang = 'Seri';
        // displayPemenang();
        displaySeri();
        return;
    }
    // belum ada yang menang
    return null;
}

function displayPemenang() {
    if (!pemenang) return;
    else {
        document.getElementById('div-pemenang').removeAttribute('hidden');
        displaySpanPemenang();
    }
}

function displaySeri() {
    document.getElementById('div-seri').removeAttribute('hidden');
}

function displaySpanPemenang() {
    elemenPemenangSpan.innerText = pemenang;
}

tombolRefresh.addEventListener('click', () => location.reload());

/*arrTombolPapan.forEach((tombol) => {
    tombol.addEventListener('click', () => {
        const baris = parseInt(tombol.dataset.baris);
        const kolom = parseInt(tombol.dataset.kolom);
        if (tombol.innerText === '') {
            tombol.innerText = elemenGiliranSpan.innerText;
            isiPapanPermainan(tombol.innerText, baris, kolom);
            ubahGiliran();
        }
    });
});

function loopSemuaNilai(papanPermainan, fungsi) {
    for (let baris = 0; baris < papanPermainan.length; baris++) {
        for (let kolom = 0; kolom < papanPermainan[baris].length; kolom++) {
            fungsi(baris, kolom);
        }
    }
}*/
