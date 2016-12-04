
import java.util.Set;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author romulo
 */
public class MailOptions {

    private String[] options;
    private String dominio = "@id.uff.br";
    private String[] nome;
    private String allName, fName, lName;

    public MailOptions(String nome) {
        this.nome = nome.toLowerCase().split(" ");
        this.fName = this.nome[0];
        this.lName = this.nome[this.nome.length - 1];
        this.allName = nome.toLowerCase();

        create();
    }

    private void create() {
        String temp = "";

        options = new String[5];

        //opção com underscore
        options[0] = fName + "_" + lName + dominio;

        //Opção com o nome todo concatenado
        options[1] = allName.replace(" ", "") + dominio;

        //opção com primeiro nome completo e restante iniciais
        for (int i = 1; i < nome.length; i++) {
            temp += nome[i].substring(0, 1);
        }
        options[2] = fName + temp + dominio;

        //opção com iniciais e apenas o ultimo nome completo
        temp = "";
        for (int i = 0; i < nome.length - 1; i++) {
            temp += nome[i].substring(0, 1);
        }
        options[3] = temp + lName + dominio;

        //Ultimo nome com primeiro nome
        options[4] = lName + fName + dominio;

    }

    public String[] getOptions() {
        return this.options;
    }

}
