import java.time.LocalDate;

public class Assignment {
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;

    public Assignment(String title, LocalDate startDate, LocalDate endDate) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return title + " (" + startDate + " ~ " + endDate + ")";
    }
}
