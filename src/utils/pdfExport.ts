/**
 * PDF Export Utility for E-LKPD Fisika SMA Kelas X
 * "ENERGY QUEST: MISI ENERGI PALEMBANG"
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StudentProfile, ObservationRecord, DecisionWorksheet } from '../types';
import { DRYING_ALTERNATIVES, DECISION_RUBRIC_ASPECTS } from '../data/etnosainsData';

interface GeneratePDFParams {
  profile: StudentProfile;
  studentNotesL2: string;
  observationTable: ObservationRecord[];
  labConclusion: string;
  studentReflectionL4: string;
  worksheet: DecisionWorksheet;
  literacyScore: number;
  rubricScores: Record<string, number>;
}

/**
 * High-fidelity Vector PDF generator that works across all devices,
 * even when browser print dialog or iframes are restricted.
 */
export function generateDirectPDF(data: GeneratePDFParams) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      // Add page header
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text('E-LKPD Fisika SMA Kelas X: Energy Quest Palembang', margin, 10);
      doc.text(`Hal. ${doc.getNumberOfPages()}`, pageWidth - margin, 10, { align: 'right' });
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, 12, pageWidth - margin, 12);
      doc.setTextColor(40, 40, 40);
    }
  };

  // Document Title Header
  doc.setFillColor(234, 88, 12); // Orange primary
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('LEMBAR KERJA PESERTA DIDIK ELEKTRONIK (E-LKPD) FISIKA SMA KELAS X', margin + 4, y + 6);

  doc.setFontSize(14);
  doc.text('ENERGY QUEST: MISI ENERGI PALEMBANG', margin + 4, y + 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Etnosains Pengeringan Kemplang Palembang & Isu Sosiosaintifik Transisi Energi', margin + 4, y + 19);

  y += 28;

  // Student Identity Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 22, 'FD');

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('IDENTITAS PESERTA DIDIK:', margin + 4, y + 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const leftX = margin + 4;
  const rightX = margin + contentWidth / 2;

  doc.text(`Nama Siswa : ${data.profile.name || '(Belum Diisi)'}`, leftX, y + 11);
  doc.text(`Kelas / No  : ${data.profile.studentClass || '-'} / ${data.profile.groupNumber || '-'}`, leftX, y + 17);

  doc.text(`Nama Sekolah : ${data.profile.school || '-'}`, rightX, y + 11);
  doc.text(`Tanggal         : ${data.profile.date || new Date().toISOString().split('T')[0]}`, rightX, y + 17);

  y += 26;

  // Score Badges
  const chosenAlt = DRYING_ALTERNATIVES.find((a) => a.id === data.worksheet.chosenAlternative);
  const totalRubricScore = Object.values(data.rubricScores).reduce((a, b) => a + b, 0);
  const maxRubricScore = DECISION_RUBRIC_ASPECTS.length * 4;
  const rubricPct = Math.round((totalRubricScore / maxRubricScore) * 100);

  doc.setFillColor(254, 243, 199);
  doc.rect(margin, y, contentWidth / 3 - 2, 12, 'F');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('VARIABEL 1: LITERASI ENERGI', margin + 2, y + 4.5);
  doc.setFontSize(9);
  doc.text(`${data.literacyScore} / 100`, margin + 2, y + 9.5);

  doc.setFillColor(243, 232, 255);
  doc.rect(margin + contentWidth / 3 + 1, y, contentWidth / 3 - 2, 12, 'F');
  doc.setTextColor(107, 33, 168);
  doc.setFontSize(7.5);
  doc.text('VARIABEL 2: KEPUTUSAN BUKTI', margin + contentWidth / 3 + 3, y + 4.5);
  doc.setFontSize(9);
  doc.text(`${rubricPct}% (${totalRubricScore}/${maxRubricScore})`, margin + contentWidth / 3 + 3, y + 9.5);

  doc.setFillColor(224, 242, 254);
  doc.rect(margin + (contentWidth / 3) * 2 + 2, y, contentWidth / 3 - 2, 12, 'F');
  doc.setTextColor(7, 89, 133);
  doc.setFontSize(7.5);
  doc.text('METODE TERPILIH', margin + (contentWidth / 3) * 2 + 4, y + 4.5);
  doc.setFontSize(8);
  doc.text(chosenAlt ? chosenAlt.name.substring(0, 24) : 'Solar Dryer Dome', margin + (contentWidth / 3) * 2 + 4, y + 9.5);

  y += 16;

  // Section 1: Level 2 Notes
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. CATATAN PENYELIDIKAN ETNOSAINS & KONVERSI ENERGI (LEVEL 2)', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const noteLines = doc.splitTextToSize(data.studentNotesL2 || 'Siswa mempelajari proses perpindahan kalor radiasi matahari pada kemplang tradisional di Palembang dan perlunya kalor laten penguapan air.', contentWidth);
  doc.text(noteLines, margin, y);
  y += noteLines.length * 4 + 4;

  // Section 2: Level 3 Solar Lab Table
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. HASIL EKSPERIMEN SOLAR LAB (Q = I × A × t × η)', margin, y);
  y += 4;

  // Table header
  doc.setFillColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  const colWidths = [8, 48, 22, 18, 18, 16, 26, 26];
  const colHeaders = ['No', 'Label Percobaan', 'I (W/m²)', 'A (m²)', 't (jam)', 'η (%)', 'Q (Joule)', 'Q (kWh)'];

  let curX = margin + 1;
  colHeaders.forEach((h, i) => {
    doc.text(h, curX, y + 4.2);
    curX += colWidths[i];
  });
  y += 6.5;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  data.observationTable.slice(0, 8).forEach((row, idx) => {
    checkPageBreak(7);
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 1, contentWidth, 5.5, 'F');
    }
    let rx = margin + 1;
    doc.text(String(idx + 1), rx, y + 3);
    rx += colWidths[0];
    doc.text(row.label.substring(0, 32), rx, y + 3);
    rx += colWidths[1];
    doc.text(String(row.intensity), rx, y + 3);
    rx += colWidths[2];
    doc.text(String(row.area), rx, y + 3);
    rx += colWidths[3];
    doc.text(String(row.durationHours), rx, y + 3);
    rx += colWidths[4];
    doc.text(`${row.efficiency}%`, rx, y + 3);
    rx += colWidths[5];
    doc.text(row.energyJoules.toLocaleString('id-ID'), rx, y + 3);
    rx += colWidths[6];
    doc.text(String(row.energyKWh), rx, y + 3);
    y += 5.5;
  });

  y += 2;
  // Lab conclusion
  checkPageBreak(18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(6, 95, 70);
  doc.text('Simpulan Eksperimen Lab Siswa:', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const labConcLines = doc.splitTextToSize(data.labConclusion || 'Energi kalor Q berbanding lurus dengan intensitas radiasi I, luas penampang kolektor A, waktu t, dan efisiensi η. Namun model Q tidak langsung menentukan waktu tuntas pengeringan kemplang karena adanya difusi massa air dan kelembaban udara.', contentWidth);
  doc.text(labConcLines, margin, y);
  y += labConcLines.length * 3.8 + 4;

  // Section 3: Level 4 Reflection
  checkPageBreak(22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. REFLEKSI ISU SOSIOSAINTIFIK KARHUTLA & BUKTI ILMIAH (LEVEL 4)', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const reflLines = doc.splitTextToSize(data.studentReflectionL4 || 'Energi terbarukan tidak memadamkan karhutla gambut secara langsung melainkan memitigasi emisi global dan menyediakan sistem pengering higienis tertutup bebas debu PM2.5.', contentWidth);
  doc.text(reflLines, margin, y);
  y += reflLines.length * 3.8 + 4;

  // Section 4: Level 5 Evidence-based Decision
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('4. LEMBAR KEPUTUSAN BERBASIS BUKTI UMKM KEMPLANG (LEVEL 5)', margin, y);
  y += 4.5;

  const steps = [
    { label: 'Masalah Utama', val: data.worksheet.problemIdentification },
    { label: 'Kriteria Prioritas', val: data.worksheet.prioritizedCriteria.join(', ') },
    { label: 'Alternatif Pilihan', val: chosenAlt ? `${chosenAlt.name} (Capex: Rp ${chosenAlt.capex.toLocaleString('id-ID')}, Opex: Rp ${chosenAlt.opexPerMonth.toLocaleString('id-ID')}/bln)` : 'Solar Dryer Dome' },
    { label: 'Bukti Data Dikutip', val: data.worksheet.citedEvidences.join('; ') },
    { label: 'Justifikasi Alasan', val: data.worksheet.detailedJustification },
    { label: 'Keterbatasan Solusi', val: data.worksheet.acknowledgedLimitations },
    { label: 'Data Tambahan', val: data.worksheet.additionalInformationNeeded }
  ];

  steps.forEach((s) => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(88, 28, 135);
    doc.text(`• ${s.label}:`, margin, y);
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const slines = doc.splitTextToSize(s.val || '(Belum dilengkapi)', contentWidth - 4);
    doc.text(slines, margin + 4, y);
    y += slines.length * 3.6 + 2;
  });

  // Section 5: Rubric Matrix Scores
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('5. ASESMEN KINERJA: RUBRIK KEPUTUSAN BERBASIS BUKTI', margin, y);
  y += 4.5;

  DECISION_RUBRIC_ASPECTS.forEach((asp) => {
    checkPageBreak(6);
    const score = data.rubricScores[asp.id] || 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(asp.aspectName, margin, y);
    doc.setTextColor(180, 83, 9);
    doc.text(`Skor: ${score} / 4`, pageWidth - margin, y, { align: 'right' });
    y += 4;
  });

  // Signature lines
  checkPageBreak(30);
  y += 8;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const sigCol1 = margin + 25;
  const sigCol2 = pageWidth - margin - 45;

  doc.text('Peserta Didik / Peneliti,', sigCol1, y, { align: 'center' });
  doc.text('Guru Pengampu Fisika,', sigCol2, y, { align: 'center' });

  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text(`( ${data.profile.name || '...........................................'} )`, sigCol1, y, { align: 'center' });
  doc.text('( ........................................... )', sigCol2, y, { align: 'center' });

  // Save the PDF
  const filename = `E-LKPD_Fisika_Energy_Quest_${data.profile.name ? data.profile.name.replace(/\s+/g, '_') : 'Siswa'}.pdf`;
  doc.save(filename);
}

/**
 * Capture HTML DOM element to PDF using html2canvas & jsPDF
 */
export async function generateHTMLToPDF(elementId: string, filename = 'E-LKPD_Energy_Quest_Palembang.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found for PDF generation');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
}
