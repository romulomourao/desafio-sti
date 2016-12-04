
import java.util.HashMap;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author romulo
 */
public class Repositorio {

    private static final java.util.Map<String, Aluno> alunos = new HashMap<>();

    public static void add(String[] aluno) {
        String key = aluno[1];
        Aluno novoAluno;        
        novoAluno = new Aluno(aluno[0], aluno[1], aluno[2], aluno[3], aluno[4], aluno[5]);
        alunos.put(key, novoAluno);
    }
    
    public static Aluno get(String matricula){
        return alunos.get(matricula);
    }

}
