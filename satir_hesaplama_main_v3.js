let fs = require('fs');
let XLSX = require('xlsx');

let dosyaIcerigi;
let varyansSatirSayisi = 0; 
let kendiSatirSayisi = 0;
let varyansSemicolon = 0;
let kendiSemicolon=0;
let varyansBracket = 0;
let kendiBracket = 0;
let varyansBracketSemicolon = 0;
let kendiBracketSemicolon =0;
let varyansBracketParantheseSemiColon = 0;
let kendiBracketParantheseSemiColon = 0;

//PSP0 programının "varyans_hesaplama.txt" text formatında satır sayısını hesapla
let dosyaOku = fs.readFileSync('varyans_hesaplama.txt', 'utf8');

for (let i=0; i<dosyaOku.length;i++){
  if (dosyaOku.slice(i,i+3) === '});'){
     ++varyansBracketParantheseSemiColon;
  }
  else if (dosyaOku.slice(i,i+2) === '};'){
    ++varyansBracketSemicolon;
  }
  else if (dosyaOku.slice(i,i+1) === ';') {
    ++varyansSemicolon;
  }
  else if (dosyaOku.slice(i,i+1) === '}') {
    ++varyansBracket;
  }
}

//değerlerin doğruluğunu kontrol etmek için ekrana yazdır
console.log('varyanscounterSemicolon: '+ varyansSemicolon);
console.log('varyanscounterBracket: '+ varyansBracket);
console.log('varyanscounterBracketSemicolon: '+ varyansBracketSemicolon);
console.log('varyansBracketParantheseSemiColon: ' + varyansBracketParantheseSemiColon);

varyansSatirSayisi = varyansSemicolon + varyansBracket + varyansBracketSemicolon + varyansBracketParantheseSemiColon ; 

console.log('varyansSatirSayisi: ' + varyansSatirSayisi);

//PSP0.1 yani şuan yazmış olduğum programın kendi kendisinin satır sayısını hesapla
let dosyaOkuKendi = fs.readFileSync('satir_hesaplama_main_v3.js', 'utf8');

for (let i=0; i<dosyaOkuKendi.length;i++){
  if (dosyaOkuKendi.slice(i,i+3) === '});'){
    ++kendiBracketParantheseSemiColon;
  }
  else if (dosyaOkuKendi.slice(i,i+2) === '};'){
    ++kendiBracketSemicolon;
  }
  else if (dosyaOkuKendi.slice(i,i+1) === ';') {
    ++kendiSemicolon;
  }
  else if (dosyaOkuKendi.slice(i,i+1) === '}') {
    ++kendiBracket;
  }
}

//değerlerin doğruluğunu kontrol etmek için ekrana yazdır
console.log('counterSemicolon2: '+ kendiSemicolon);
console.log('counterBracket2: '+ kendiBracket);
console.log('counterBracketSemicolon2: '+ kendiBracketSemicolon);
console.log('BracketParantheseSemiColon2: ' + kendiBracketParantheseSemiColon);

kendiSatirSayisi = kendiSemicolon + kendiBracket + kendiBracketSemicolon + kendiBracketParantheseSemiColon ;

console.log('kendiSatirSayisi: ' + kendiSatirSayisi);

const yazdirSatir = XLSX.utils.book_new();
yazdirSatir.SheetNames.push('SatirSayisi');
const ssData = [['Satir Sayisi','Kendi Satir Sayisi']];

//Excele satır sayılarını yazdır
const excelCell = [varyansSatirSayisi, kendiSatirSayisi];
ssData.push(excelCell);
const satirSayisi = XLSX.utils.aoa_to_sheet(ssData);
yazdirSatir.Sheets['SatirSayisi'] = satirSayisi;
XLSX.writeFile(yazdirSatir, './SatirSayisiHesaplama.xlsx', { bookType: 'xlsx', bookSST: true, type: 'binary' });
console.log("\nSatır sayısı hesaplaması bitti. Sonuçları görmek için SatirSayisiHesaplama.xlsx excel dosyasına bakınız!!!\n"); 