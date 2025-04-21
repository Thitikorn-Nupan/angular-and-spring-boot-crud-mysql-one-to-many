package com.ttknpdev.understandhowtoworkwithangular.entities.one;

import com.ttknpdev.understandhowtoworkwithangular.entities.many.Address;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "employees")
public class Employee {
    /**
     Why use _ before name
     because I use auto generate setter , getter in typescript
     And it sent value same name attribute
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eid")
    private Long _eid;
    @Column(name = "fullname")
    private String _fullname;
    @Column(name = "age")
    private Short _age;
    @Column(name = "position")
    private String _position;
    @Column(name = "salary")
    private Double _salary;
    // Mapping to the other table
    @OneToMany(cascade = CascadeType.ALL) // ,targetEntity = Address.class ,mappedBy = "ob"
    @JoinColumn(name = "eid") // On Address Table
    private List<Address> _addresses;

    @Override
    public String toString() {
        return "Employee{" +
                "_eid=" + _eid +
                ", _fullname='" + _fullname + '\'' +
                ", _age=" + _age +
                ", _position='" + _position + '\'' +
                ", _salary=" + _salary +
                ", _addresses=" + _addresses +
                '}';
    }
}
