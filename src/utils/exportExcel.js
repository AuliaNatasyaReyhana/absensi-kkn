import { utils, writeFile } from 'xlsx';

export const exportAttendanceToExcel = (records, filename = `rekap-kehadiran-${new Date().toISOString().slice(0, 10)}.xlsx`) => {
  const rows = records.map((item) => ({
    Nama: item.nama || '-',
    Status: item.status || '-',
    Keterangan: item.keterangan || '-',
    Tanggal: item.tanggal || '-',
    Waktu: item.waktu || '-',
  }));

  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Rekap Kehadiran');

  worksheet['!cols'] = [
    { width: 24 },
    { width: 14 },
    { width: 32 },
    { width: 14 },
    { width: 12 },
  ];

  writeFile(workbook, filename);
};
