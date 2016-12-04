
import java.util.Scanner;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author romulo
 */
public class Sessao {

    private Aluno aluno;
    private boolean atividade;
    private Scanner in = new Scanner(System.in);

    public Sessao() {
        inputMatricula();
    }

    private void inputMatricula() {

        System.out.println("Digite sua matricula: ");
        String matricula = in.nextLine();
        this.aluno = Repositorio.get(matricula);
        //Verifica se existe aluno para a matricula digitada
        if (aluno != null) {
            atividade = true;
            if (aluno.isAtivo()) {
                init();
            } else {
                System.out.println("Desculpe " + aluno.getNome() + ", infelizmente sua conta está inativa. \n");
            }

        } else {
            System.out.println("Matricula não existe, tente novamente");

        }
    }

    private void init() {

        while (atividade) {
            showInfo();
            if (aluno.isAtivo() && (aluno.getUffmail().equals(""))) {
                System.out.println(aluno.getNome() + ", por favor escolha uma das opções abaixo para o seu UFFMail: ");
                showMailOptions(aluno.getNome());
            } else {
                System.out.println("Você já possui UFFMail: \n " + aluno.getUffmail()+"\n");
            }

            atividade = false;

        }
    }

    private void showMailOptions(String nome) {
        MailOptions mo = new MailOptions(nome);
        String[] options = mo.getOptions();

        for (int i = 0; i < options.length; i++) {
            System.out.println(i + 1 + " - " + options[i]);
        }
        int escolha = in.nextInt();
        in.nextLine();
        aluno.setUffmail(options[escolha - 1]);
        System.out.println("A criação de seu e-mail [" + aluno.getUffmail() + "] será feita nos próximos minutos.\n Um SMS foi enviado para " + aluno.getTelefone() + " com a sua senha de acesso.");
    }

    private void showInfo() {
        System.out.println("--------------DADOS PESSOAIS--------------");
        System.out.println("|Nome: "+aluno.getNome());
        System.out.println("|Matricula: "+aluno.getMatricula());
        System.out.println("|Telefone: "+aluno.getTelefone());
        System.out.println("|Email: "+aluno.getEmail());
        System.out.println("|UFFMail: "+aluno.getUffmail());
        System.out.println("-------------------------------------------");
    }

}
