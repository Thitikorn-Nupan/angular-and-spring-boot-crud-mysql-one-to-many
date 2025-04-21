package com.ttknpdev.understandhowtoworkwithangular.entities.many;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ttknpdev.understandhowtoworkwithangular.entities.one.Employee;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aid")
    private Long _aid;
    /**
       the @JoinColumn annotation to specify the foreign key column (eid).
       If you don’t provide the JoinColumn name, the name will be set automatically.
    */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eid")
    // @JsonIgnore is used to ignore the logical property used in serialization and deserialization.
    @JsonIgnore
    private Employee employee; // for create
    @Column(name = "city")
    private String _city;
    @Column(name = "country")
    private String _country;
    @Column(name = "details")
    private String _details;


    @Override
    public String toString() {
        return "Address{" +
                "aid=" + _aid +
                ", city='" + _city + '\'' +
                ", country='" + _country + '\'' +
                ", details='" + _details + '\'' +
                '}';
    }
}
