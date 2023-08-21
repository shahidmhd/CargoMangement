import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfDocument = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Invoice Report</Text>
        {data?.map((invoice, index) => (
          <View key={index} style={styles.invoice}>
            {/* Render invoice details */}
            <Text>Invoice Number: {invoice.InvoiceNo}</Text>
            <Text>Invoice Date: {invoice.InvoiceDate}</Text>
            <Text>Company Name: {invoice.CompanyName}</Text>
            <Text>Airway Bill: {invoice.Airwaybill}</Text>
            <Text>Box Number: {invoice.BoxNo}</Text>

            {/* Render tableRows */}
            {invoice.tableRows?.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                <Text>Service Name: {row.ServiceName}</Text>
                <Text>HSN Code: {row.HSNCode}</Text>
                <Text>Weight: {row.weight}</Text>
                <Text>Amount: {row.unitvalue}</Text>
                {/* Render more row details if needed */}
              </View>
            ))}

            <Text>Subtotal: {invoice.Taxablevalue}</Text>
            <Text>Total Weight: {invoice.weight}</Text>
            <Text>IGST: {invoice.IGST}</Text>
            <Text>CGST: {invoice.CGST}</Text>
            <Text>SGST: {invoice.SGST}</Text>
            <Text>Total Amount: {invoice.Total}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  invoice: {
    marginBottom: 10,
    padding: 10,
    border: '1 solid #ccc',
  },
  row: {
    marginBottom: 5,
    padding: 5,
    border: '1 solid #ccc',
  },
});

export default PdfDocument;
