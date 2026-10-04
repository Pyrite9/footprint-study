import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    Assignment a = new Assignment("1주차 과제", LocalDate.of(2026, 10, 1), LocalDate.of(2026, 10, 7));
    System.out.println(a);
  }
}
