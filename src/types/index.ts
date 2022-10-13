export interface DataAspirasi {
    nama : string,
    email : string,
    usia : string,
    bidang : string,
    kota : string,
    kecamatan : string,
    kepuasan : string,
    image : string,
    aspirasi : string,
}

export default interface Data {
    current_page: number,
    data : DataAspirasi[],
    last_page: number,
    total: number,
}

export interface Region {
    id : string,
    name : string,
  }
  
export interface Districts {
    id : string,
    name : string,
    }