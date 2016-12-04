
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import javax.swing.JFileChooser;

public class CSVReader {

    public void init() {

        String csvFile;
        String line;
        JFileChooser chooser;
        chooser = new JFileChooser();

        int retorno = chooser.showOpenDialog(null);
        if (retorno == JFileChooser.APPROVE_OPTION) {
            csvFile = chooser.getSelectedFile().getAbsolutePath();
            System.out.println(csvFile);

            try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

                while ((line = br.readLine()) != null) {

                    String[] alunoLido = line.split(",");
                    Repositorio.add(alunoLido);

                }

                br.close();

            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

}
